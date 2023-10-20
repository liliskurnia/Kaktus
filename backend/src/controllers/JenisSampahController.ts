'use strict';
import { Request, Response } from 'express';
import IController from './IController';

//database models
const db = require('../db/models/');
const dm = db.jenis_sampah;

class JenisSampahController implements IController {
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
    const { nama, kode, programName, createdBy } = req.body;
    try {
      if (!nama) {
        return res.status(400).send('nama jenis sampah belum di isi');
      }
      if (!kode) {
        return res.status(400).send('kode jenis sampah belum di isi');
      }
      const exist = await dm.findOne({ where: { kode } });
      if (exist) {
        return res.status(400).send('kode sampah yg sama sudah terdaftar');
      }
      await dm.create({
        nama,
        kode,
        programName,
        createdBy,
      });
      return res.status(200).send('jenis sampah baru berhasil didaftarkan');
    } catch (error) {
      console.error(error);
      return res.status(500).send('jenis sampah backend error');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nama, kode, programName, updatedBy } = req.body;
    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(400).send('data jenis sampah tidak ditemukan');
      }
      const current = data.nama;
      await data.update({
        nama,
        kode,
        programName,
        updatedBy,
      });
      return res.status(200).send(`location of ${current} has been updated`);
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

export default new JenisSampahController();
