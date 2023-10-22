'use strict';
import { Request, Response } from 'express';
import IController from './IController';

//database constants
const db = require('../db/models/');
const dm = require('../db/models/').tps;

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
      return res.status(500).send('server error');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id, { order: ['id'] });
      if (!data) {
        return res.status(404).send('data tps tidak ditemukan');
      } else {
        return res.status(200).json(data);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('server error');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { nama, latitude, longitude, programName, createdBy } = req.body;

    try {
      let barcode = generateBarcodeString(12, true);
      let exist = await dm.findOne({
        where: { barcode },
      });
      while (exist) {
        barcode = generateBarcodeString(12, true);
        exist = await dm.findOne({ where: { barcode } });
      }
      //   const barcodeImagePath = `../../assets/qrcodes/${barcode}.png`;
      //   generateBarcodeImage(barcode, barcodeImagePath);
      const newTps = await dm.create({
        nama,
        barcode,
        latitude,
        longitude,
        programName,
        createdBy,
      });
      return res.status(200).send('tps telah berhasil dibuat');
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
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
      return res.status(500).send('server error');
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
      return res.status(500).send('server error');
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
      await data.destroy();
      return res.status(200).send(`data tps: ${current} telah berhasil dihapus`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  };
}

function generateBarcodeString(digits?: number, includeAlpha?: boolean): string {
  const length = digits || 12;
  const alphanumeric = includeAlpha || false;

  if (alphanumeric === false) {
    let maxString = '';
    for (let i = 0; i < length; i++) {
      maxString += '9';
    }
    const maxValue = parseInt(maxString);
    const output = Math.floor(Math.random() * maxValue);
    return output.toString();
  } else {
    let output = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
      output += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return output;
  }
}

function generateBarcodeImage(barcode: string, path: string) {
  const qr = require('qrcode');

  qr.toFile(path, barcode, { errorCorrectionLevel: 'H', version: 3 }, function (error: any) {
    if (error) throw error;
    console.log('qr code image generated succesfully');
  });
}
export default new TPSController();
