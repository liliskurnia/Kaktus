'use strict';
import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';
import mailSender from '../utils/mailSender';

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
      return res.status(500).send('registrasi driver error');
    }
  };

  registerWithVerification = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, nik, nama, email, telp, alamat, kota, gender, programName, createdBy } = req.body;
    const now = new Date();
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
        return res.status(400).send('email belum di isi');
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

      const existingApplicant = await OTPHolder.findOne({ where: { email }, order: [['createdAt', 'DESC']] });
      if (existingApplicant) {
        const expiryDate = new Date(existingApplicant.expiredAt);
        if (expiryDate.valueOf() <= now.valueOf()) {
          console.log('token has expired, generating a new token (valid for 5 minutes)');
          const currentTime = new Date();
          let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          let otpExists = await OTPHolder.findOne({ where: { otp } });
          while (otpExists) {
            otp = otpGenerator.generate(6, {
              upperCaseAlphabets: false,
              lowerCaseAlphabets: false,
              specialChars: false,
            });
            otpExists = await OTPHolder.findOne({ where: { otp } });
          }
          const expiredAt = currentTime.valueOf() + 60 * 5 * 1000;
          const oldData = await OTPHolder.findAll({ where: { email: existingApplicant.email } });
          for (const data of oldData) {
            await data.destroy();
          }

          const newOTP = await OTPHolder.create({
            username: existingApplicant.username,
            password: existingApplicant.password,
            nik: existingApplicant.nik,
            nama: existingApplicant.nama,
            email: existingApplicant.email,
            telp: existingApplicant.telp,
            alamat: existingApplicant.alamat,
            kota: existingApplicant.kota,
            gender: existingApplicant.gender,
            otp,
            expiredAt,
          });
          const email = newOTP.email;
          mailSender(
            email,
            'Email Verification',
            `Please verify your email using this OTP code: ${newOTP.otp}`,
            `<h1>Please verify your email using OTP</h1>
             <p>Your OTP Code: ${newOTP.otp}</p>`
          );
          return res.status(400).send('OTP Expired, sending a new OTP (valid for 5 minutes)');
        } else if (expiryDate.valueOf() > now.valueOf()) {
          return res.status(400).send('user sudah terdaftar, tapi belum melakukan verifikasi');
        }
      }

      const verified = await User.findOne({ where: { nik } });
      if (verified) {
        return res.status(400).send('user sudah terdafatar dan terverifikasi');
      }
      const hashedPassword: string = await Authentication.passwordHash(password);
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      let otpExists = await OTPHolder.findOne({ where: { otp } });
      while (otpExists) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        otpExists = await OTPHolder.findOne({ where: { otp } });
      }
      const expiredAt = now.valueOf() + 60 * 5 * 1000;
      await OTPHolder.create({
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
        expiredAt,
      });
      mailSender(
        email,
        'Email Verification',
        `Please verify your email using this OTP code: ${otp}`,
        `<h1>Please verify your email using OTP</h1>
        <p>Your OTP Code: ${otp}</p>`
      );
      return res.status(200).send('registrasi driver sukses, menunggu verifikasi user');
    } catch (error) {
      console.error(error);
      return res.status(500).send('registrasi driver gagal');
    }
  };

  verifyEmail = async (req: Request, res: Response): Promise<Response> => {
    const { email, otp, programName } = req.body;
    const now = new Date();
    try {
      //find data in temporary OTP table
      const data = await OTPHolder.findOne({ where: { email }, order: [['createdAt', 'DESC']] });
      if (!data) {
        return res.status(404).send('data user tidak ditemukan');
      }
      const expiryDate = new Date(data.expiredAt);
      if (expiryDate.valueOf() < now.valueOf()) {
        //if otp has expired, create new otp and delete the old otp
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        let otpExists = await OTPHolder.findOne({ otp });
        while (otpExists) {
          otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          otpExists = await OTPHolder.findOne({ otp });
        }
        const expiredAt = now.valueOf() + 60 * 5;
        const newOTP = await OTPHolder.create({
          username: data.username,
          password: data.password,
          nik: data.nik,
          nama: data.nama,
          email: data.email,
          telp: data.telp,
          alamat: data.alamat,
          kota: data.kota,
          gender: data.gender,
          otp,
          expiredAt,
        });
        await data.destroy();
        const email = newOTP.email;
        mailSender(
          email,
          'Email Verification',
          `Please verify your email using this OTP code: ${newOTP.otp}`,
          `<h1>Please verify your email using OTP</h1>
         <p>Your OTP Code: ${newOTP.otp}</p>`
        );
        return res.status(400).send('OTP has expired, sending a new OTP (valid for 5 minutes)');
      }
      console.log(data);
      if (data.otp !== otp) {
        return res.status(400).send('OTP tidak sesuai, gagal memverifikasi user');
      }
      const user = await User.create({
        username: data.username,
        password: data.password,
        nik: data.nik,
        nama: data.nama,
        email: data.email,
        telp: data.telp,
        alamat: data.alamat,
        kota: data.kota,
        gender: data.gender,
        programName,
        createdBy: 'Registration System',
      });
      await data.destroy();
      const newUser = await User.max('id');
      const customerRole = await Role.findOne({ where: { nama: 'Customer' } });
      await HakAkses.create({
        userId: newUser,
        roleId: customerRole.id,
      });
      let uniqueCode = BarcodeGenerator.generateCode('CU', 16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode('CU', 16, true);
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      const customer = await dm.create({
        userId: newUser,
        uniqueCode,
        nik: user.nik,
        nama: user.nama,
        email: user.email,
        telp: user.telp,
        alamat: user.alamat,
        kota: user.kota,
        gender: user.gender,
        programName,
        createdBy: 'Registration System',
      });
      BarcodeGenerator.generateImage(uniqueCode, qrFolderPath, user.nama);
      return res.status(200).send('user berhasil diverifikasi dan terdaftar di db');
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
      await historyData.destroy();
      await data.destroy();
      return res.status(200).send(`data user "${nama}" telah berhasil dihapus.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('gagal menghapus user');
    }
  };
}

export default new DriverController();
