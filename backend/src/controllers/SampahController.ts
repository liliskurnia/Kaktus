'use strict';
import { Request, Response } from 'express';
import IController from './IController';

//database models
const db = require('../db/models/');
const dm = db.sampah_master;

class SampahController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await dm.findAll({ order: ['id'] });
      if (data.length === 0) {
        return res.status(404).send('belum ada data');
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send('server error');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send('data tidak ditemukam');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    return res.status(500).send('unavailible');
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(400).send('data tempat sampah tidak ditemukan');
      }
      const current = data.barcode;
      await data.update({
        latitude,
        longitude,
      });
      return res.status(200).send(`location of ${current} has been updated`);
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
        return res.status(400).send('status tempat sampah tidak boleh kosong');
      }
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(400).send('data tempat sampah tidak ditemukan');
      }
      const current = data.barcode;
      await data.update({
        status,
        programName,
        updatedBy,
      });
      return res.status(200).send(`status tempat sampah: ${current} telah berhasil diubah`);
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
        return res.status(404).send('data tidak ditemukan');
      }
      const current = data.barcode;
      await data.destroy();
      return res.status(200).send(`tempat sampah: ${current} telah berhasil dihapus`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  };
}

function generateBarcodeImage(barcode: string, path: string) {
  const qr = require('qrcode');

  qr.toFile(path, barcode, { errorCorrectionLevel: 'H', version: 3 }, function (error: any) {
    if (error) throw error;
    console.log('qr code image generated succesfully');
  });
}
export default new SampahController();
