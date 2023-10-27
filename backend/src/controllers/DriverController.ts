'use strict';
import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';

const fs = require('fs');

const db = require('../db/models');
const dm = db.master_driver;
const User = db.user;
const HakAkses = db.hak_akses;
const Role = db.role;
const History = db.accepted_request_history;
const qrFolderPath = './public/qrcodes';

class DriverController implements IController {
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
    const { userId, programName, createdBy } = req.body;

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
        let driver: boolean = false;
        //checks if role is admin / driver
        for (const acs of access) {
          if (acs.role.nama.search('Admin') !== -1) {
            admin = true;
          } else if (acs.role.nama.search('Driver') !== -1) {
            driver = true;
          }
        }
        if (admin === true) {
          //if admin, cancel creation
          return res.status(400).send('Admins cannot have other previlages');
        } else if (driver !== true) {
          //if role as driver not assigned, assign the role as driver
          const roleId = await Role.findOne({ where: { nama: 'Driver' } });
          await HakAkses.create({
            userId,
            roleId,
          });
        }
      }
      //create unique driver code
      let uniqueCode = BarcodeGenerator.generateCode('DR', 16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode('DR', 16, true);
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      //register user as driver at db
      const driver = await dm.create({
        userId,
        uniqueCode,
        nik: user.nik,
        nama: user.nama,
        email: user.email,
        telp: user.telp,
        alamat: user.alamat,
        kota: user.kota,
        gender: user.gender,
        programName,
        createdBy,
      });
      BarcodeGenerator.generateImage(uniqueCode, qrFolderPath, user.nama);
      return res.status(201).send(`registrasi driver ${user.nama} sukses`);
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
      const driverRole = await Role.findOne({ where: { nama: 'Driver' } });
      await HakAkses.create({
        userId: newUser,
        roleId: driverRole.id,
      });
      let uniqueCode = BarcodeGenerator.generateCode('DR', 16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode('DR', 16, true);
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      const driver = await dm.create({
        userId: newUser,
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
      return res.status(200).send('registrasi user(driver) sukses');
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  };

  createBarcode = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(400).send('customer data not found');
      }
      BarcodeGenerator.generateImage(data.uniqueCode, qrFolderPath, data.nama);
      return res.status(200).send('Barcode file generated successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('barcode generation error');
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

      const current = data.nama;
      await data.update({
        tpId,
        nama: current,
        alamat,
        email: email.toLowerCase(),
        telp,
        programName,
        updatedBy,
      });
      return res.status(200).send(`update data user "${current}" sukses.`);
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

      const nama = data.nama;
      const historyData = await History.findAll({ where: { masterDriverId: data.id } });
      await fs.rm(`${qrFolderPath}/images/${data.uniqueCode}.png`, function (error: any) {
        if (error) throw error;
      });
      await fs.rm(`${qrFolderPath}/svgs/${data.uniqueCode}.svg`, function (error: any) {
        if (error) throw error;
      });
      await fs.rm(`${qrFolderPath}/pdfs/${data.uniqueCode}.pdf`, function (error: any) {
        if (error) throw error;
      });
      await historyData.destroy();
      await data.destroy();
      return res.status(200).send(`data user "${nama}" telah berhasil dihapus.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('gagal menghapus user.');
    }
  };
}

export default new DriverController();
