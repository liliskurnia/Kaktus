'use strict';
import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';
import mailSender from '../utils/EMailSender';

const fs = require('fs');
const otpGenerator = require('otp-generator');

const db = require('../db/models');
const dm = db.master_customer;
const User = db.user;
const Sampah = db.sampah_master;
const HakAkses = db.hak_akses;
const Role = db.role;
const OTPHolder = db.otp_holder;
const History = db.customer_request_history;
const qrFolderPath = './public/qrcodes';

class CustomerController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await dm.findAll({ include: [{ model: User, attributes: ['points'] }] });

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

      const access = await HakAkses.findAll({ where: { userId }, include: [{ model: 'roles', attributes: ['nama'] }] });
      if (access) {
        let admin: boolean = false;
        let customer: boolean = false;
        //checks if role is admin / customer
        for (const acs of access) {
          if (acs.role.nama.search('Admin') !== -1) {
            admin = true;
          } else if (acs.role.nama.search('Customer') !== -1) {
            customer = true;
          }
        }
        if (admin === true) {
          //if admin, cancel creation
          return res.status(400).send('Admin tidak boleh memiliki hak akses lain');
        } else if (customer !== true) {
          //if role as customer not assigned, assign the role as customer
          const roleId = await Role.findOne({ where: { nama: 'Customer' } });
          await HakAkses.create({
            userId,
            roleId,
          });
        }
      }

      //create unique customer code
      let uniqueCode = BarcodeGenerator.generateCode('CU', 16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = BarcodeGenerator.generateCode('CU', 16, true);
        exist = await dm.findOne({ where: { uniqueCode } });
      }
      //register user as customer at db
      const customer = await dm.create({
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
      //generate customer's QR Code Assets
      BarcodeGenerator.generateImage(uniqueCode, qrFolderPath, user.nama);

      return res.status(201).send(`registrasi customer ${user.nama} sukses`);
    } catch (err) {
      console.log(err);
      return res.status(500).send('registrasi user gagal.');
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
      const userExist = await OTPHolder.findOne({ where: { email }, order: [['createdAt', 'DESC']] });
      if (userExist) {
        const expiryDate = new Date(userExist.expiredAt);
        if (expiryDate.valueOf() <= now.valueOf()) {
          console.log('token has expired, generating new otp code');
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
          const oldDatas = await OTPHolder.findAll({ where: { email: userExist.email } });
          for (const oldData of oldDatas) {
            await oldData.destroy();
          }

          const newOTP = await OTPHolder.create({
            username: userExist.username,
            password: userExist.password,
            nik: userExist.nik,
            nama: userExist.nama,
            email: userExist.email,
            telp: userExist.telp,
            alamat: userExist.alamat,
            kota: userExist.kota,
            gender: userExist.gender,
            otp,
            expiredAt,
          });
          const email = newOTP.email;
          mailSender(
            email,
            'Email Verification',
            `Please verify your email using this OTP code: ${newOTP.otp}`,
            `<h1>Please verify your email using OTP</h1>
             <p>Your OTP Code: <b>${newOTP.otp}</b></p>`
          );
          return res.status(400).send('OTP expired, sending a new OTP (valid for 5 minutes)');
        } else if (expiryDate.valueOf() > now.valueOf()) {
          return res.status(400).send('user sudah terdaftar, tapi belum melakukan verifikasi');
        }
      }

      const verified = await User.findOne({ where: { nik } });
      if (verified) {
        return res.status(400).send('user sudah terdaftar dan terverifikasi');
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
        <p>Your OTP Code: <b>${otp}</b></p>`
      );
      return res.status(200).send('registrasi user-customer sukses, menunggu verifikasi user');
    } catch (error) {
      console.error(error);
      return res.status(500).send('registrasi user error');
    }
  };

  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, nik, nama, email, telp, alamat, kota, gender, programName, createdBy } = req.body;
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

      return res.status(200).send('registrasi user-customer sukses');
    } catch (error) {
      console.error(error);
      return res.status(500).send('registrasi user error');
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

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id, {
        include: [{ model: User, attributes: ['points'] }],
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

  getSampahList = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const customer = await db.master_customer.findByPk(id);
      if (!customer) {
        return res.status(404).send('data customer tidak ditemukan');
      }
      const data = await db.sampah_master.findAll({ where: { ownerCode: customer.uniqueCode }, order: ['id'] });
      if (!data) {
        return res.status(404).send('data sampah tidak ditemukan');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mencari data sampah');
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
      return res.status(500).send('gagal membuat barcode');
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
      return res.status(500).send('penambahan point error');
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
      const historyData = await History.findAll({ where: { masterCustomerId: data.id } });
      const sampahs = await Sampah.findAll({ where: { ownerCode: data.uniqueCode } });
      for (const sampah of sampahs) {
        await fs.rm(`${qrFolderPath}/images/${sampah.barcode}.png`, function (error: any) {
          if (error) throw error;
        });
        await fs.rm(`${qrFolderPath}/svgs/${sampah.barcode}.svg`, function (error: any) {
          if (error) throw error;
        });
        await fs.rm(`${qrFolderPath}/pdfs/${sampah.barcode}.pdf`, function (error: any) {
          if (error) throw error;
        });
      }
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

export default new CustomerController();
