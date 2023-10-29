'use strict';
import { Request, Response } from 'express';
import IController from './IController';

const db = require('../db/models/');
const dm = require('../db/models/').hak_akses;
const role = db.role;
const user = db.user;

class HakAksesController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const hakAksesList = await dm.findAll({
        //ambil referensi data dari data model role dan user
        include: [
          { model: role, attributes: ['nama'] },
          { model: user, attributes: ['username'] },
        ],
        order: ['id'],
      });

      if (hakAksesList.length === 0) {
        return res.status(404).send('Belum ada data');
      } else {
        return res.status(200).json(hakAksesList);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('server error');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const data = await dm.findByPk(id, {
        include: [
          { model: role, attributes: ['nama'] },
          { model: user, attributes: ['username'] },
        ],
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
    const { userId, roleId, programName, createdBy } = req.body;

    try {
      const newRole = await role.findByPk(roleId);
      const newUser = await user.findByPk(userId);
      if (!userId) {
        return res.status(400).send('user belum diisi');
      } else if (!roleId) {
        return res.status(400).send('role belum diisi');
      } else {
        const existingUserRole = await dm.findOne({
          where: { userId },
        });
        if (existingUserRole) {
          return res.status(400).send('user yang dipilih sudah diberikan role sebelumnya');
        } else {
          const newData = await dm.create({
            userId,
            roleId,
            programName,
            createdBy,
          });
          return res.status(201).send(`Hak akses ${newRole.nama} untuk user: ${newUser.username} telah berhasil dibuat`);
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('pendaftaran hak akses gagal');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { userId, roleId, programName, updatedBy } = req.body;

    try {
      if (!userId) {
        return res.status(400).send('user belum diisi');
      } else if (!roleId) {
        return res.status(400).send('role belum diisi');
      } else {
        const data = await dm.findByPk(id);
        if (!data) {
          return res.status(404).send(`Data dengan id: ${id} tidak ditemukan.`);
        }

        const current = data.nama;
        await data.update({
          userId,
          roleId,
          programName,
          updatedBy,
        });
        return res.status(200).send(`Menu "${current}" telah berhasil diubah.`);
      }
    } catch (err) {
      console.error(err);
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
      console.error(err);
      return res.status(500).send(`Gagal menghapus menu.`);
    }
  };

  // getAccess = async (req: Request, res: Response): Promise<Response> => {
  //   const { username } = req.body;

  //   try {
  //     const user = await db.user.findOne({ where: { username } });
  //     console.log(user);
  //     if (!user) {
  //       return res.status(404).send('user not found');
  //     }
  //     const hakAkses = await dm.findOne({ where: { userId: user.id } });
  //     console.log(hakAkses);
  //     if (!hakAkses) {
  //       return res.status(200).json({ userId: user.id, roleId: 7 });
  //     }

  //     return res.status(200).json(hakAkses);
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).send(`failed to get user previlages`);
  //   }
  // };
}

export default new HakAksesController();
