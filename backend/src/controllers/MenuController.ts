'use strict';
import { Request, Response } from 'express';
import IController from './IController';

const db = require('../db/models/');
const dm = db.menu;

class MenuController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const menuList = await dm.findAll({
        exclude: ['programName'],
        order: ['id'],
      });

      if (menuList.length === 0) {
        return res.status(404).send('Belum ada data');
      } else {
        return res.status(200).json(menuList);
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
    const { nama, icon, url, programName, createdBy } = req.body;

    try {
      if (!nama) {
        return res.status(400).send('nama menu belum diisi');
      } else {
        const existingMenu = await dm.findOne({ where: { nama } });
        if (existingMenu) {
          return res.status(400).send('Menu dengan nama yang sama sudah terdaftar.');
        } else {
          const newMenu = await dm.create({
            nama,
            icon,
            url,
            programName,
            createdBy,
          });
          return res.status(201).send(`Menu "${nama}" telah berhasil ditambahkan.`);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send('Menu gagal ditambahkan.');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nama, icon, url, updatedBy } = req.body;

    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send(`Data dengan id: ${id} tidak ditemukan.`);
      }

      const current = data.nama;
      await data.update({
        nama,
        icon,
        url,
        updatedBy,
      });
      return res.status(200).send(`Menu "${current}" telah berhasil diubah.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(`Gagal mengubah menu.`);
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id);
      if (!data) {
        return res.status(404).send(`Menu dengan id: ${id} tidak ditemukan.`);
      }

      const current = data.nama;
      await data.destroy();
      return res.status(200).send(`Menu "${current}" berhasil dihapus.`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(`Gagal menghapus menu.`);
    }
  };
}

export default new MenuController();
