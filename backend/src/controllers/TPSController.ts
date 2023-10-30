'use strict';
import { Request, Response } from 'express';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';

//filestream
const fs = require('fs');
//database constants
const db = require('../db/models/');
const dm = require('../db/models/').tps;
const qrFolderPath = './public/qrcodes';

class TPSController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await dm.findAll();
      if (data.length === 0) {
        return res.status(404).send('belum ada data tps');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data tps');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data tps yang dipilih tidak dapat ditemukan');
      } else {
        return res.status(200).json(data);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('gagal mengambil data tps yang dipilih');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { nama, latitude, longitude, programName, createdBy } = req.body;

    try {
      if (nama === 'Unassigned') {
        let barcode = BarcodeGenerator.generateCode('TPS', 12, true);
        let exist = await dm.findOne({
          where: { barcode },
        });
        while (exist) {
          barcode = BarcodeGenerator.generateCode('TPS', 12, true);
          exist = await dm.findOne({ where: { barcode } });
        }
        const newTps = await dm.create({
          nama,
          barcode,
          latitude,
          longitude,
          programName,
          createdBy,
        });
        return res.status(200).send('tps telah berhasil dibuat');
      }
      let barcode = BarcodeGenerator.generateCode('TPS', 12, true);
      let exist = await dm.findOne({
        where: { barcode },
      });
      while (exist) {
        barcode = BarcodeGenerator.generateCode('TPS', 12, true);
        exist = await dm.findOne({ where: { barcode } });
      }
      const newTps = await dm.create({
        nama,
        barcode,
        latitude,
        longitude,
        programName,
        createdBy,
      });
      BarcodeGenerator.generateImage(barcode, qrFolderPath, nama);

      return res.status(200).send('tps telah berhasil dibuat');
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal membuat data tps baru');
    }
  };

  createBarcode = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(400).send('data tps tidak dapat ditemukan');
      }
      BarcodeGenerator.generateImage(data.barcode, qrFolderPath, data.nama);
      return res.status(200).send('barcode berhasil dibuat');
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal membuat barcode');
    }
  };

  registerTempatSampah = async (req: Request, res: Response): Promise<Response> => {
    const { tpsId, jenisSampahId } = req.body;
    try {
      if (!tpsId) {
        return res.status(400).send('id tps belum diisi');
      }
      if (!jenisSampahId) {
        return res.status(400).send('jenis sampah belum diisi');
      }
      if (tpsId === 1 || jenisSampahId === 1) {
        return res.status(400).send("ID ini eksklusif untuk 'Unassigned', tidak dapat mendaftarkan sampah dengan id ini");
      }
      const tps = await dm.findByPk(tpsId);
      const jenis = await db.jenis_sampah.findByPk(jenisSampahId);
      if (!tps) {
        return res.status(404).send('tps tidak ditemukan/terdaftar');
      }
      if (!jenis) {
        return res.status(404).send('jenis sampah tidak ditemukan/terdaftar');
      }
      const jenisSampah = `${jenis.kode}-${jenis.nama}`;
      const barcode = `${BarcodeGenerator.generateCode(`TPS${tpsId - 1}-`, 16, true)}-${jenis.kode}`;
      await db.sampah_master.create({
        ownerCode: tps.barcode,
        jenisSampahId,
        jenisSampah,
        barcode,
        status: 'Inactive',
      });
      BarcodeGenerator.generateImage(barcode, './public/qrcodes', `${tps.nama}-${jenisSampah}`);
      return res.status(200).send('tempat sampah telah berhasil diregistrasi');
    } catch (error) {
      console.error(error);
      return res.status(500).send('registrasi tempat sampah error');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nama, latitude, longitude, programName, updatedBy } = req.body;
    try {
      if (!nama) {
        return res.status(400).send('nama belum diisi');
      }
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data tidak ditemukan');
      }

      const current = data.nama;
      await data.update({
        nama,
        latitude,
        longitude,
        programName,
        updatedBy,
      });
      return res.status(200).send(`data tps: ${current} telah berhasil diubah`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengupdate tps');
    }
  };

  updateStatus = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { status, programName, updatedBy } = req.body;
    try {
      if (!status) {
        return res.status(400).send('status tidak boleh kosong');
      }
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data tidak ditemukan');
      }

      const current = data.nama;
      await data.update({
        status,
        programName,
        updatedBy,
      });
      return res.status(200).send(`data tps: ${current} telah berhasil diubah`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengupdate status tps');
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data tps tidak ditemukan');
      }

      const current = data.nama;
      await fs.rm(`${qrFolderPath}/images/${data.barcode}.png`, function (error: any) {
        if (error) throw error;
      });
      await fs.rm(`${qrFolderPath}/svgs/${data.barcode}.svg`, function (error: any) {
        if (error) throw error;
      });
      await fs.rm(`${qrFolderPath}/pdfs/${data.barcode}.pdf`, function (error: any) {
        if (error) throw error;
      });
      await data.destroy();
      return res.status(200).send(`data tps: ${current} telah berhasil dihapus`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal menghapus tps');
    }
  };
}
export default new TPSController();
