'use strict';
import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';

const fs = require('fs');
const db = require('../db/models');
const dm = db.master_operator;
const User = db.user;
const HakAkses = db.hak_akses;
const Role = db.role;
const qrFolderPath = './public/qrcodes';

class OperatorController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await dm.findAll();

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
    const { userId, tpId, programName, createdBy } = req.body;

    try {
      if (!userId) {
        return res.status(400).send('userId tidak diisi');
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send('user tidak ditemukan');
      }
      if (!user.telp || user.telp === '') {
        return res.status(400).send('nomor telepon harus di isi di user data');
      }
      const access = await HakAkses.findAll({ where: { userId }, include: [{ model: Role, attributes: ['nama'] }] });
      console.log(access);
      if (access) {
        let admin: boolean = false;
        let operator: boolean = false;
        //checks if role is admin / operator
        for (const acs of access) {
          if (acs.role.nama.search('Admin') !== -1) {
            admin = true;
          } else if (acs.role.nama.search('Operator') !== -1) {
            operator = true;
          }
        }
        if (admin === true) {
          //if admin, cancel creation
          return res.status(400).send('admin tidak boleh memiliki hak akses lain');
        } else if (operator !== true) {
          //if role as operator not assigned, assign the role as driver
          const roleId = await Role.findOne({ where: { nama: 'Operator' } });
          await HakAkses.create({
            userId,
            roleId,
          });
        }
      }
      //create unique customer code
      let uniqueCode = BarcodeGenerator.generateCode('OP', 16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode('OP', 16, true);
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      //register user as operator at db
      const operator = await dm.create({
        userId,
        tpId,
        uniqueCode,
        nik: user.nik,
        nama: user.nama,
        email: user.email,
        telp: user.telp,
        alamat: user.alamat,
        gender: user.gender,
        kota: user.kota,
        programName,
        createdBy,
      });
      BarcodeGenerator.generateImage(uniqueCode, qrFolderPath, user.nama);
      return res.status(201).send(`registrasi operator ${user.nama} sukses`);
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
      if (!telp) {
        return res.status(400).send('nomor telepon tidak boleh kosong');
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
      const hashedPassword: string = await Authentication.passwordHash(password);
      await User.create({
        username,
        password: hashedPassword,
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
      const newUser = await User.max('id');
      const operatorRole = await Role.findOne({ where: { nama: 'Operator' } });
      await HakAkses.create({
        userId: newUser,
        roleId: operatorRole.id,
      });
      let uniqueCode = BarcodeGenerator.generateCode('OP', 16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode('OP', 16, true);
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      const operator = await dm.create({
        userId: newUser,
        tpId: 1,
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
      BarcodeGenerator.generateImage(uniqueCode, qrFolderPath, nama);
      return res.status(200).send('registrasi user(operator) sukses');
    } catch (error) {
      console.error(error);
      return res.status(500).send('registrati user error');
    }
  };

  createBarcode = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(400).send('data operator tidak ditemukan');
      }
      BarcodeGenerator.generateImage(data.uniqueCode, qrFolderPath, data.nama);
      return res.status(200).send('barcode berhasil dibuat');
    } catch (error) {
      console.error(error);
      return res.status(500).send('pembuatan barcode error');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id);

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
    const { tpId, nama, alamat, email, telp, programName, updatedBy } = req.body;

    try {
      if (!tpId) {
        return res.status(400).send('id tps (tpId) belum di isi');
      }
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
        tpId,
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

  updateTPS = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { tpId } = req.body;
    try {
      if (!tpId) {
        return res.status(400).send('tps belum di isi');
      }
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data operator tidak ditemukan');
      }
      const tps = await db.tps.findByPk(tpId);
      if (!tps) {
        return res.status(404).send('data tps tidak ditemukan');
      }
      await data.update({ tpId });
      return res.status(200).send(`${data.nama} berhasil didaftarkan sebagai operator ${tps.nama}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal update tps');
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data operator tidak ditemukan.');
      }

      const nama = data.nama;

      await fs.rm(`${qrFolderPath}/images/${data.uniqueCode}.png`, function (error: any) {
        if (error) throw error;
      });
      await fs.rm(`${qrFolderPath}/svgs/${data.uniqueCode}.svg`, function (error: any) {
        if (error) throw error;
      });
      await fs.rm(`${qrFolderPath}/pdfs/${data.uniqueCode}.pdf`, function (error: any) {
        if (error) throw error;
      });
      await data.destroy();
      return res.status(200).send(`data operator "${nama}" telah berhasil dihapus.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('gagal menghapus operator');
    }
  };
}
export default new OperatorController();
