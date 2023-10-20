import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';

const db = require('../db/models');
const dm = db.master_customer;
const User = db.user;
const Sampah = db.sampah;
const HakAkses = db.hak_akses;
const Role = db.role;

class CustomerController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await dm.findAll({
        exclude: ['password'],
        order: ['id'],
      });

      if (data.length === 0) {
        return res.status(400).send('Belum ada data.');
      } else {
        return res.status(200).json(data);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send('Data tidak ditemukan.');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;

    try {
      if (!userId) {
        return res.status(400).send('userId tidak diisi');
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send('user tidak ditemukan');
      }

      await dm.create({
        userId,
        nik: user.nik,
        nama: user.nama,
        email: user.email,
        telp: user.telp,
        alamat: user.alamat,
        kota: user.kota,
        gender: user.gender,
      });

      // console.log('arrId', arrId);
      // if (newData) {
      //   return res.status(201).send('registrasi user sukses!');
      // }
      return res.status(201).send(`registrasi customer ${user.nama} sukses`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('registrasi user gagal.');
    }
  };

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
      if (!email) {
        return res.status(400).send('email belum diisi');
      }
      if (!alamat) {
        return res.status(400).send('alamat belum diisi');
      }
      if (!kota) {
        return res.status(400).send('kota belum diisi');
      }
      if (!gender) {
        return res.status(400).send('gender tidak boleh kosong');
      }
      await User.create({
        username,
        password,
        nik,
        nama,
        email: email.toLowerCase(),
        telp,
        alamat,
        kota,
        gender,
        programName,
        createdBy,
      });
      const newUserId = await User.max('id');
      const roleId = await Role.findOne({ where: { nama: 'Customer' } });
      await HakAkses.create({
        userId: newUserId,
        roleId,
      });
      let uniqueCode = generateUserCode(16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = generateUserCode(16, true);
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      const customer = await dm.create({
        userId: newUserId,
        uniqueCode,
        nik,
        nama,
        email: email.toLowerCase(),
        telp,
        alamat,
        kota,
        gender,
        programName,
        createdBy: 'Registration System',
      });
      const jenisSampahs = await db.jenis_sampah.findAll(['kode']);
      for (const jenisSampah of jenisSampahs) {
        const barcode = `${jenisSampah.kode}-${uniqueCode}`;
        await Sampah.create({
          barcode,
          programName: 'Registration System',
          createdBy: 'Registration System',
        });
      }
      return res.status(200).send('registrasi user-customer sukses');
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id, {
        exclude: ['password'],
        order: ['id'],
      });

      if (!data) {
        return res.status(404).send('user tidak ditemukan.');
      }
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).send('pencarian user gagal.');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nama, alamat, email, telp, programName, updatedBy } = req.body;

    try {
      if (!nama) {
        return res.status(400).send('nama belum diisi');
      }
      if (!email) {
        return res.status(400).send('email belum diisi');
      }
      if (!telp) {
        return res.status(400).send('nomor telepon belum diisi');
      }
      if (!alamat) {
        return res.status(400).send('alamat belum diisi');
      }
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data user tidak ditemukan.');
      }

      const userName = data.username;
      await data.update({
        nama,
        alamat,
        email: email.toLowerCase(),
        telp,
        programName,
        updatedBy,
      });
      return res.status(200).send(`update data user "${userName}" sukses.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('update data gagal.');
    }
  };

  addPoint = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { points } = req.body;

    try {
      const current = await User.FindByPk(id);
      const currentPoints = current.points;
      const newPoints = currentPoints + points;
      await User.update({
        points: newPoints,
      });
      return res.status(200).send('point berhasil ditambah');
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data user tidak ditemukan.');
      }

      const userName = data.username;

      await db.hak_akses.destroy({ where: { userId: id } });
      await data.destroy();
      return res.status(200).send(`data user "${userName}" telah berhasil dihapus.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('gagal menghapus user.');
    }
  };
}

function generateUserCode(digits?: number, includeAlpha?: boolean): string {
  const length = digits || 12;
  const alphanumeric = includeAlpha || false;
  const year = new Date().getFullYear().toString();
  const code = 'CU';

  if (alphanumeric === false) {
    let maxString = '';
    for (let i = 0; i < length; i++) {
      maxString += '9';
    }
    const maxValue = parseInt(maxString);
    const id = Math.floor(Math.random() * maxValue);
    const output: string = `${code}${year}${id}`;
    return output;
  } else {
    let output: string = code + year;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
      output += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return output;
  }
}

function generateUserBarcode(barcode: string, path: string) {
  const qr = require('qrcode');

  qr.toFile(path, barcode, { errorCorrectionLevel: 'H', version: 3 }, function (error: any) {
    if (error) throw error;
    console.log('qr code image generated succesfully');
  });
}
export default new CustomerController();
