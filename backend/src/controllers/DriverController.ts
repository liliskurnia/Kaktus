'use strict';
import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';
import mailSender from '../utils/EMailSender';

const fs = require('fs');
const otpGenerator = require('otp-generator');

const db = require('../db/models');
const dm = db.master_driver;
const User = db.user;
const HakAkses = db.hak_akses;
const Role = db.role;
const History = db.accepted_request_history;
const OTPHolder = db.otp_holder;
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
          return res.status(400).send('admin tidak boleh memiliki hak akses lain');
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
      let uniqueCode = BarcodeGenerator.generateCode({
        initialString: 'DR',
        length: 16,
        uppercaseAlphabet: true,
      });
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode({
          initialString: 'DR',
          length: 16,
          uppercaseAlphabet: true,
        });
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
      BarcodeGenerator.generateImage(uniqueCode, qrFolderPath, { title: user.nama, pngOut: true, pdfOut: true, svgOut: true });

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
        verified: true,
        programName,
        createdBy,
      });
      const newUser = await User.max('id');
      const driverRole = await Role.findOne({ where: { nama: 'Driver' } });
      await HakAkses.create({
        userId: newUser,
        roleId: driverRole.id,
      });
      let uniqueCode = BarcodeGenerator.generateCode({
        initialString: 'DR',
        length: 16,
        uppercaseAlphabet: true,
      });
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode({
          initialString: 'DR',
          length: 16,
          uppercaseAlphabet: true,
        });
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
      BarcodeGenerator.generateImage(uniqueCode, qrFolderPath, { title: nama, pngOut: true, pdfOut: true, svgOut: true });

      return res.status(200).send('registrasi user(driver) sukses');
    } catch (error) {
      console.error(error);
      return res.status(500).send('registrasi driver error');
    }
  };

  registerWithVerification = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, nik, nama, email, telp, alamat, kota, gender } = req.body;
    const now = new Date();

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
      const exist = await User.findOne({ where: { nik } });
      if (exist && exist.verified) {
        return res.status(400).send('user sudah terdaftar');
      } else if (exist && !exist.verified) {
        return res.status(400).send('user sudah terdaftar (belum verifikasi)');
      }
      const hashedPassword: string = await Authentication.passwordHash(password);
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      let otpExist = await User.findOne({ where: { otp } });
      while (otpExist) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        otpExist = await User.findOne({ where: { otp } });
      }
      const otpExpiry = now.valueOf() + 1000 * 60 * 5;
      mailSender(
        email,
        'Email Verification',
        `Please verify your email using this OTP code: ${otp}`,
        `<h1>Please verify your email using OTP</h1>
       <p>Your OTP Code: ${otp}</p>`
      );
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
        otp,
        otpExpiry,
        programName: 'Registration System',
        createdBy: 'Registration System',
      });

      return res.status(200).send('registrasi user-customer sukses, menunggu verifikasi user');
    } catch (error) {
      console.error(error);
      return res.status(500).send('registrasi user error');
    }
  };

  verifyEmail = async (req: Request, res: Response): Promise<Response> => {
    const { email, otp } = req.body;
    const now = new Date();
    try {
      const data = await User.findOne({ where: { email } });
      if (!data) {
        return res.status(404).send('data user tidak ditemukan');
      }
      if (data.verified === true) {
        return res.status(400).send('user has been verified');
      }
      const otpExpiry = new Date(data.otpExpiry);
      if (otpExpiry.valueOf() <= now.valueOf()) {
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        let otpExist = await User.findOne({ where: { otp } });
        while (otpExist) {
          otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          otpExist = await User.findOne({ where: { otp } });
        }
        const otpExpiry = new Date().valueOf() + 1000 * 60 * 5;
        mailSender(
          email,
          'Email Verification',
          `Please verify your email using this OTP code: ${otp}`,
          `<h1>Please verify your email using OTP</h1>
         <p>Your OTP Code: ${otp}</p>`
        );
        await data.update({ otp, otpExpiry });
        return res.status(400).send('OTP has expired, sending new verification OTP (valid for 5 minutes)');
      }
      if (data.otp !== otp) {
        let TimeRemaining = Math.floor((otpExpiry.valueOf() - now.valueOf()) / 1000);
        let minutes = 0;
        let seconds = 0;
        while (TimeRemaining > 0) {
          if (TimeRemaining - 60 >= 0) {
            minutes++;
            TimeRemaining -= 60;
          } else {
            seconds += TimeRemaining;
          }
        }
        return res.status(400).send(`kode verifikasi OTP tidak sesuai, silakan coba lagi (waktu sebelum kode expired: ${minutes}:${seconds})`);
      }
      await data.update({ verified: true, otp: null, otpExpiry: null, updatedBy: 'Verification System' });
      const customerRole = await Role.findOne({ where: { nama: 'Customer' } });
      await HakAkses.create({
        userId: data.id,
        roleId: customerRole.id,
      });
      let uniqueCode = BarcodeGenerator.generateCode({
        length: 16,
        uppercaseAlphabet: true,
        initialString: 'DR',
      });
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode({
          length: 16,
          uppercaseAlphabet: true,
          initialString: 'DR',
        });
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      await dm.create({
        userId: data.id,
        uniqueCode,
        nik: data.nik,
        nama: data.nama,
        email: data.email,
        telp: data.telp,
        alamat: data.alamat,
        kota: data.kota,
        gender: data.gender,
        programName: 'Verification System',
        createdBy: 'Verification System',
      });
      return res.status(200).send('user berhasil diverifikasi dan terdaftar sebagai customer');
    } catch (error) {
      console.error(error);
      return res.status(500).send('failed to verify user');
    }
  };

  createBarcode = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(400).send('data customer tidak ditemukan');
      }
      BarcodeGenerator.generateImage(data.uniqueCode, qrFolderPath, { title: data.nama, pngOut: true, pdfOut: true, svgOut: true });
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

  updateTPS = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { tpId } = req.body;
    try {
      if (!tpId) {
        return res.status(400).send('tps belum di isi');
      }
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data driver tidak ditemukan');
      }
      const tps = await db.tps.findByPk(tpId);
      if (!tps) {
        return res.status(404).send('data tps tidak ditemukan');
      }
      await data.update({ tpId });
      return res.status(200).send(`${data.nama} berhasil didaftarkan sebagai driver ${tps.nama}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('update tps error');
    }
  };

  updateLocation = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    try {
      if (!latitude || !longitude) {
        return res.status(400).send('data lokasi tidak lengkap');
      }
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data driver tidak ditemukan');
      }

      await data.update({ latitude, longitude });
      return res.status(200).send('lokasi driver berhasil diupdate');
    } catch (error) {
      console.error(error);
      return res.status(500).send('error update lokasi driver');
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
      return res.status(500).send('penambahan point error');
    }
  };

  getSchedule = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const driver = await dm.findByPk(id);
      if (!driver) {
        return res.status(404).send('data driver tidak dapat ditemukan');
      }
      const datas = await db.master_pickup.findAll({
        where: {
          requestType: 'SCHEDULED',
          driverCode: driver.uniqueCode,
        },
        attributes: ['id', 'requestCode', 'requesterCode', 'trashCode', 'trashType', 'scheduledDate', 'status', 'pickedAt', 'completedAt'],
        order: [['scheduledDate', 'DESC']],
      });
      if (!datas || datas.length === 0) {
        return res.status(404).send('data schedule tidak ditemukan/ belum ada data');
      }
      for (var data of datas) {
        var trash = await db.sampah_master.findOne({ where: { barcode: data.trashCode } });
        if (!trash) {
          console.log('data not found');
        }
        const latitude = trash.latitude;
        const longitude = trash.longitude;
        data.dataValues['trashLocation'] = { latitude, longitude };
      }

      return res.status(200).json(datas);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data schedule');
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
      for (const record of historyData) {
        await record.destroy();
      }
      await data.destroy();
      return res.status(200).send(`data user "${nama}" telah berhasil dihapus.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('gagal menghapus user');
    }
  };
}

export default new DriverController();
