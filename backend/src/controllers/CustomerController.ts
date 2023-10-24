'use strict';
import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';

const path = require('path');

const db = require('../db/models');
const dm = db.master_customer;
const User = db.user;
const Sampah = db.sampah_master;
const HakAkses = db.hak_akses;
const Role = db.role;
const qrFolderPath = './public/qrcodes';

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
    const { userId, programName, createdBy } = req.body;

    try {
      if (!userId) {
        return res.status(400).send('userId tidak diisi');
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send('user tidak ditemukan');
      }
      const exists = await dm.findOne({ where: { userId } });
      if (exists) {
        const haveSampahRegistered = await Sampah.findAll({ where: { masterCustomerId: exists.id } });
        if (!haveSampahRegistered) {
          const jenisSampahs = await db.jenis_sampah.findAll({ order: ['id'] });
          for (const jenisSampah of jenisSampahs) {
            if (jenisSampah.nama.search('Undefined') !== -1) {
              continue;
            }
            const barcode = `${jenisSampah.kode}-${exists.uniqueCode}`;
            await Sampah.create({
              masterCustomerId: exists.id,
              jenisSampahId: jenisSampah.id,
              jenisSampah: `${jenisSampah.kode} - ${jenisSampah.nama}`,
              barcode,
              programName: 'Registration System',
              createdBy: 'Registration System',
            });
            generateBarcodeImage(barcode, qrFolderPath);
          }
          return res.status(201).send(`registrasi sampah untuk customer ${user.nama} sukses`);
        }
        return res.status(400).send('');
      }
      const access = await HakAkses.findAll({ where: { userId }, include: [{ model: 'roles', attributes: ['nama'], as: 'roleName' }] });
      if (access) {
        let admin: boolean = false;
        let customer: boolean = false;
        //checks if role is admin / customer
        for (const acs of access) {
          if (acs.roleName.search('Admin') !== -1) {
            admin = true;
          } else if (acs.roleName.search('Customer') !== -1) {
            customer = true;
          }
        }
        if (admin === true) {
          //if admin, cancel creation
          return res.status(400).send('Admins cannot have other previlages');
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
      let uniqueCode = generateUserCode(16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = generateUserCode(16, true);
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
      //get current list of kode sampah
      const jenisSampahs = await db.jenis_sampah.findAll({ order: ['id'] });
      //get latest user id
      const customerId = await db.master_customer.max('id');
      //generate unique user trash codes based on types in db
      for (const jenisSampah of jenisSampahs) {
        const barcode = `${jenisSampah.kode}-${uniqueCode}`;
        await Sampah.create({
          masterCustomerId: customerId,
          jenisSampahId: jenisSampah.id,
          jenisSampah: `${jenisSampah.kode} - ${jenisSampah.nama}`,
          barcode,
          programName: 'Registration System',
          createdBy: 'Registration System',
        });
        generateBarcodeImage(barcode, qrFolderPath);
      }
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
      let uniqueCode = generateUserCode(16, true);
      let exist = await dm.findOne({ where: { uniqueCode } });
      while (exist) {
        uniqueCode = generateUserCode(16, true);
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
      const jenisSampahs = await db.jenis_sampah.findAll({ order: ['id'] });
      const customerId = await db.master_customer.max('id');
      for (const jenisSampah of jenisSampahs) {
        if (jenisSampah.nama.search('Undefined') !== -1) {
          continue;
        }
        const barcode = `${jenisSampah.kode}-${uniqueCode}`;
        await Sampah.create({
          masterCustomerId: customerId,
          jenisSampahId: jenisSampah.id,
          jenisSampah: `${jenisSampah.kode}-${jenisSampah.nama}`,
          barcode,
          programName: 'Registration System',
          createdBy: 'Registration System',
        });
        generateBarcodeImage(barcode, qrFolderPath);
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

  getSampahList = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await db.sampah_master.findAll({ where: { masterCustomerId: id }, order: ['id'] });
      if (!data) {
        return res.status(404).send('data sampah not found');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  };

  getSampahBarcodeOutput = async (req: Request, res: Response): Promise<Response> => {
    const { masterCustomerId, jenisSampahId } = req.body;
    try {
      const data = await db.sampah_master.findOne({ where: { masterCustomerId, jenisSampahId } });
      if (!data) {
        return res.status(404).send('barcode not found');
      }
      const qrcode = generateBarcodeOutput(data.barcode, generationMethod.string);
      const output = {
        barcode: data.barcode,
        qrcode: qrcode,
      };
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      return res.status(500).send('barcode url generation error');
    }
  };

  createBarcodeSampah = async (req: Request, res: Response): Promise<Response> => {
    const { masterCustomerId } = req.body;
    try {
      const dataCollection = await db.sampah_master.findAll({ where: { masterCustomerId } });
      if (!dataCollection) {
        return res.status(404).send('customer info not found');
      }
      for (const data of dataCollection) {
        generateBarcodeImage(data.barcode, qrFolderPath);
      }
      return res.status(200).send('all qr images generated successfully for customer sampahs');
    } catch (error) {
      console.error(error);
      return res.status(500).send('barcode image generation error');
    }
  };

  // downloadBarcode = async (req: Request, res: Response): Promise<Response<any>> => {
  //   const { barcode } = req.params;
  //   try {
  //     const data = await db.sampah_master.findOne({ where: { barcode: barcode } });

  //     if (!data) {
  //       return res.status(404).send('barcode not found');
  //     }
  //     const file = `${barcode}.png`;
  //     var fileLocation = path.join('./public/qrcodes/', file);
  //     res.download(`${fileLocation}`);
  //     console.log(fileLocation);
  //     return res.status(200).send('download succesfull');
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send('error fetching image file ');
  //   }
  // };

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

enum generationMethod {
  url,
  string,
}

function generateBarcodeImage(barcode: string, path: string) {
  const qr = require('qrcode');

  qr.toFile(`${path}/svgs/${barcode}.svg`, barcode, { errorCorrectionLevel: 'H', version: 3, type: 'svg' }, function (error: any) {
    if (error) throw error;
    console.log('qr code image generated succesfully');
  });
  qr.toFile(`${path}/images/${barcode}.png`, barcode, { errorCorrectionLevel: 'H', version: 3, type: 'png' }, function (error: any) {
    if (error) throw error;
    console.log('qr code image generated succesfully');
  });
}

function generateBarcodeOutput(barcode: string, method: generationMethod): any {
  const qr = require('qrcode');

  switch (method) {
    case generationMethod.url:
      var output;
      qr.toDataURL(barcode, { errorCorrectionLevel: 'H', version: 3 }, function (error: any, url: any) {
        if (error) throw error;
        // console.log(url);
        output = url;
      });
      return output;
    case generationMethod.string:
      var output;
      qr.toString(barcode, { errorCorrectionLevel: 'H', version: 3, type: 'svg' }, function (error: any, string: any) {
        if (error) throw error;
        output = string;
      });
      return output;
  }
}
export default new CustomerController();
