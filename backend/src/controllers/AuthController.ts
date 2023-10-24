import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
const db = require('../db/models');

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, nik, nama, email, telp, alamat, kota, gender, programName, createdBy } = req.body;
    try {
      if (!nik) {
        return res.status(400).send('nik belum diisi');
      }
      if (!password) {
        return res.status(400).send('password belum diisi');
      }
      if (!nama) {
        return res.status(400).send('nama belum diisi');
      }

      const hashedPassword: string = await Authentication.passwordHash(password);

      await db.user.create({
        username,
        password: hashedPassword,
        nik,
        nama,
        email,
        telp,
        alamat,
        kota,
        gender,
        programName,
        createdBy,
      });

      console.log('new user registered');
      return res.status(201).send('registrasi sukses !!');
    } catch (err) {
      console.log(err);
      return res.status(500).send('registrasi user gagal');
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    // cari data user by username
    try {
      const { username, password } = req.body;

      if (!username) {
        return res.status(400).send('username belum diisi');
      } else if (!password) {
        return res.status(400).send('password belum diisi');
      }
      //check for username in database
      let user = await db.user.findOne({
        where: { username },
      });
      //if no username exist, check the following as the username
      if (!user) {
        //cek NIK as username
        user = await db.user.findOne({
          where: { nik: username },
        });
        if (!user) {
          //cek email as username
          user = await db.user.findOne({
            where: { email: username },
          });
          if (!user) {
            //cek no.telp as username
            user = await db.user.findOne({
              where: { telp: username },
            });
            if (!user) {
              return res.status(401).send('user tidak ditemukan');
            }
          }
        }
      }
      console.log(user);
      const compare = await Authentication.passwordCompare(password, user.password);
      if (compare) {
        const token = Authentication.generateToken(user.id, username, user.password);
        const hakAkses = await db.hak_akses.findOne({
          where: { userId: user.id },
          include: [{ model: db.role, attributes: ['nama'] }],
        });
        console.log(hakAkses);
        let listSampah = null;
        if (hakAkses.role.nama === 'Customer') {
          const customer = await db.master_customer.findOne({ where: { userId: user.id } });
          listSampah = await db.sampah_master.findAll({
            where: { masterCustomerId: customer.id },
            attributes: ['barcode'],
            include: [
              {
                model: db.jenis_sampah,
                attributes: ['nama'],
              },
            ],
          });
          const access = {
            token: token,
            previllage: 'Customer',
            userId: user.id,
            barcodes: listSampah,
          };
          console.log(listSampah);
          return res.status(200).json(access);
        }
        let access = null;
        if (hakAkses) {
          console.log(hakAkses);
          access = {
            token: token,
            previllage: hakAkses.role.nama,
            userId: user.id,
          };
        } else {
          access = {
            token: token,
            previllage: 'Unassigned',
            userId: user.id,
          };
        }

        console.log(access);
        return res.status(200).json({
          access,
        });
      }
      return res.status(401).send('Authentication failed, Wrong Password');
    } catch (err) {
      console.log(err);
      return res.status(500).send('Login authentication error');
    }
  };

  profile = (req: Request, res: Response): Response => {
    return res.send(req.app.locals.credential);
  };
}

export default new AuthController();
