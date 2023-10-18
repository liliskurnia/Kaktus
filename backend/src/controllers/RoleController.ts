'use strict';
import { Request, Response } from 'express';
import IController from './IController';

const db = require('../db/models/');
const dm = db.role;

class RoleController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const roleList = await dm.findAll({
        exclude: ['programName'],
        order: ['id'],
      });

      if (roleList.length === 0) {
        return res.status(404).send('Belum ada data');
      } else {
        return res.status(200).json(roleList);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Data tidak ditemukan');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id, {
        exclude: ['programName'],
        order: ['id'],
      });
      if (!data) {
        return res.status(404).send(`Data dengan id: ${id} tidak ditemukan`);
      } else {
        return res.status(200).json(data);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Data tidak ditemukan');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { nama, programName, createdBy } = req.body;

    try {
      if (!nama) {
        return res.status(400).send('nama role belum diisi');
      } else {
        const existingName = await dm.findOne({ where: { nama } });
        if (existingName) {
          return res.status(400).send('Role dengan nama yang sama sudah terdaftar.');
        } else {
          const newData = await dm.create({
            nama,
            programName,
            createdBy,
          });
          return res.status(201).send(`Role: "${nama}" telah berhasil ditambahkan.`);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send('Role gagal ditambahkan.');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nama, programName, updatedBy } = req.body;

    try {
      if (!nama) {
        return res.status(400).send('nama role belum diisi');
      } else {
        const data = await dm.findByPk(id);
        if (!data) {
          return res.status(404).send(`Data dengan id: ${id} tidak ditemukan.`);
        }

        const current = data.nama;
        await data.update({ nama, programName, updatedBy });
        return res.status(200).send(`Role "${current}" telah berhasil diubah.`);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(`Gagal mengubah role.`);
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send(`Role dengan id: ${id} tidak ditemukan.`);
      }

      const current = data.nama;
      await data.destroy();
      return res.status(200).send(`Role "${current}" berhasil dihapus.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(`Gagal menghapus role.`);
    }
  };
}

export default new RoleController();
