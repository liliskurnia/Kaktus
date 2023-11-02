'use strict';
import { Request, Response } from 'express';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';
import DateManager from '../utils/DateManager';

const db = require('../db/models');
const RequestDB = db.master_pickup;
const Operator = db.master_operator;
const Driver = db.master_driver;
const TPS = db.tps;
const Sampah = db.sampah_master;
const History = db.master_pickup_history;
const requestType = 'SCHEDULED';

class ScheduleController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await RequestDB.findAll({ where: { requestType }, order: [['createdAt', 'DESC']] });
      if (data.length === 0) {
        return res.status(400).send('belum ada data');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data scheduled request');
    }
  };

  indexByTps = async (req: Request, res: Response): Promise<Response> => {
    const { tpId } = req.params;
    try {
      const tps = await TPS.findByPk(tpId);
      if (!tps) {
        return res.status(404).send('data tps tidak dapat ditemukan');
      }
      const data = await RequestDB.findAll({ where: { requesterCode: tps.barcode } });
      if (!data || data.length === 0) {
        return res.status(404).send('data schedule tps tidak dapat ditemukan/belum ada');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data schedule tps');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request yang dicari tidak dapat ditemukan');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data scheduled request yang dipilih');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { tpsCode, operatorCode, driverCode, trashCode, scheduledDate, createdBy } = req.body;
    try {
      const tps = await TPS.findOne({ where: { barcode: tpsCode } });
      const operator = await Operator.findOne({ where: { uniqueCode: operatorCode } });
      const driver = await Driver.findOne({ where: { uniqueCode: driverCode } });
      if (!tps) {
        return res.status(404).send('data tps tidak dapat ditemukan');
      }
      if (!operator) {
        return res.status(404).send('data operator tidak dapat ditemukan');
      }
      if (!driver) {
        return res.status(404).send('data driver tidak dapat ditemukan');
      }
      if (!trashCode) {
        return res.status(400).send('kode sampah belum diisi');
      }
      if (operator.tpId !== tps.id && operator.tpId !== driver.tpId) {
        return res.status(400).send('akses pembuatan schedule ditolak (id operator tidak sama dengan id tps and id tps driver)');
      }
      const sampah = await Sampah.findOne({ where: { barcode: trashCode } });
      const jenis = await db.jenis_sampah.findByPk(sampah.jenisSampahId);
      if (!sampah) {
        return res.status(404).send('tempat sampah tidak terdaftar');
      }
      let requestCode = BarcodeGenerator.generateCode({ length: 16, requestCode: true, requestType, trashType: jenis.kode, uppercaseAlphabet: true });
      let exist = await RequestDB.findOne({ where: { requestCode } });
      while (exist) {
        requestCode = BarcodeGenerator.generateCode({ length: 16, requestCode: true, requestType, trashType: jenis.kode, uppercaseAlphabet: true });
        exist = await RequestDB.findOne({ where: { requestCode } });
      }
      const assignedBy = createdBy || operatorCode;
      await RequestDB.create({
        requestCode,
        requestType,
        requesterCode: tps.barcode,
        requesterName: tps.nama,
        requesterGender: 'X',
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
        driverGender: driver.gender,
        trashCode,
        trashType: sampah.jenisSampah,
        scheduledDate,
        status: 'Assigned',
        createdBy: assignedBy,
      });
      await History.create({
        requestCode,
        requestType,
        requesterCode: tps.barcode,
        requesterName: tps.nama,
        requesterGender: 'X',
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
        driverGender: driver.gender,
        trashCode,
        trashType: sampah.jenisSampah,
        scheduledDate,
        status: 'Assigned',
        createdBy: assignedBy,
      });
      return res.status(200).send('pembuatan schedule berhasil');
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal menmbuat schedule');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { tpsCode, operatorCode, driverCode, trashCode, scheduledDate, updatedBy } = req.body;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });
      const tps = await TPS.findOne({ where: { barcode: tpsCode }, attributes: ['nama'] });
      const operator = await Operator.findOne({ where: { uniqueCode: operatorCode }, attributes: ['nama'] });
      const driver = await Driver.findOne({ where: { uniqueCode: driverCode }, attributes: ['nama'] });
      if (!tps) {
        return res.status(404).send('data tps tidak dapat ditemukan');
      }
      if (!operator) {
        return res.status(404).send('data operator tidak dapat ditemukan');
      }
      if (!driver) {
        return res.status(404).send('data driver tidak dapat ditemukan');
      }
      if (!trashCode) {
        return res.status(400).send('kode sampah belum diisi');
      }
      if (operator.tpId !== tps.id && operator.tpId !== driver.tpId) {
        return res.status(400).send('akses pengubahan schedule ditolak (id operator tidak sama dengan id tps and id tps driver)');
      }
      const sampah = await Sampah.findOne({ where: { barcode: trashCode } });
      if (!sampah) {
        return res.status(404).send('tempat sampah tidak terdaftar');
      }
      const assignedBy = updatedBy || operatorCode;
      await data.update({
        requesterCode: tps.barcode,
        requesterName: tps.nama,
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
        driverGender: driver.gender,
        trashCode,
        trashType: sampah.jenisSampah,
        scheduledDate,
        updatedBy: assignedBy,
      });
      await history.update({
        requesterCode: tps.barcode,
        requesterName: tps.nama,
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
        driverGender: driver.gender,
        trashCode,
        trashType: sampah.jenisSampah,
        scheduledDate,
        updatedBy: assignedBy,
      });
      return res.status(200).send('data schedule berhasil diupdate');
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengupdate data schedule');
    }
  };

  //status updates
  otw = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Picking Up';
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status });
      await history.update({ status });
      return res.status(200).send("berhasil mengubah status request menjadi 'Picking-Up'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengupdate status request');
    }
  };

  cancel = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { requesterCode } = req.body;
    const status = 'Cancled';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status, updatedBy: requesterCode });
      await history.update({ status });
      return res.status(200).send("berhasil mengubah status request menjadi 'Cancled'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('schedule deletion error');
    }
  };

  pickedup = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Picked Up';
    const now = DateManager.getTimestamp();

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status, pickedAt: now, updatedBy: data.driverCode });
      await history.update({ status, pickedAt: now });
      return res.status(200).send("berhasil mengubah status request menjadi 'Picked-Up'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengupdate status request');
    }
  };

  complete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Completed';
    const now = DateManager.getTimestamp();

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });
      const sampah = await Sampah.findOne({ where: { barcode: data.trashCode } });
      const tps = await TPS.findOne({ where: { barcode: data.requesterCode } });
      await data.update({ status, completedAt: now, updatedBy: data.driverCode });
      await history.update({ status, completedAt: now });
      await sampah.update({ status: 'Collected', latitude: tps.latitude, longitude: tps.longitude, updatedBy: data.driverCode });
      return res.status(200).send("berhasil mengupdate status request menjadi 'Completed'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengupdate status request');
    }
  };

  delayed = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Delayed';
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status, updatedBy: data.driverCode });
      await history.update({ status });
      return res.status(200).send("berhasil mengupdate status request menjadi 'Delayed'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengupdate status request');
    }
  };
  //delete
  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const current = data.requestCode;
      await data.destroy();
      return res.status(200).send(`data ${current} telah berhasil dihapus`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal menghapus schedule');
    }
  };
}
export default new ScheduleController();
