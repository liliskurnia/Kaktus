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
      return res.status(500).send('server error');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await dm.findByPk(id);
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
      BarcodeGenerator.generateImage(data.barcode, qrFolderPath, data.nama);
      return res.status(200).send('Barcode file generated successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('barcode generation error');
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
      return res.status(500).send('server error');
    }
  };
}
export default new TPSController();
