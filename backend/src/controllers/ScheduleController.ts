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
      return res.status(500).send('failed to fetch schedule data');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('specified data not found');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('failed to fetch specified schedule data');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { tpsCode, operatorCode, driverCode, trashCode, scheduledDate, createdBy } = req.body;
    try {
      const tps = await TPS.findOne({ where: { barcode: tpsCode } });
      const operator = await Operator.findOne({ where: { uniqueCode: operatorCode } });
      const driver = await Driver.findOne({ where: { uniqueCode: driverCode } });
      if (!tps) {
        return res.status(404).send('tps data not found');
      }
      if (!operator) {
        return res.status(404).send('operator data not found');
      }
      if (!driver) {
        return res.status(404).send('driver data not found');
      }
      if (!trashCode) {
        return res.status(400).send('kode sampah belum diisi');
      }
      const sampah = await Sampah.findOne({ where: { barcode: trashCode } });
      const jenis = await db.jenis_sampah.findByPk(sampah.jenisSampahId);
      if (!sampah) {
        return res.status(404).send('tempat sampah tidak terdaftar');
      }
      let requestCode = BarcodeGenerator.generateRequestCode('SP', jenis.kode, 16, true);
      let exist = await RequestDB.findOne({ where: { requestCode } });
      while (exist) {
        requestCode = BarcodeGenerator.generateRequestCode('SP', jenis.kode, 16, true);
        exist = await RequestDB.findOne({ where: { requestCode } });
      }
      const assignedBy = createdBy || operatorCode;
      await RequestDB.create({
        requestCode,
        requestType,
        requesterCode: tps.barcode,
        requesterName: tps.nama,
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
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
      return res.status(200).send('schedule created successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('schedule creation error');
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { tpsCode, operatorCode, driverCode, trashCode, scheduledDate, updatedBy } = req.body;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('schedule data not found');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });
      const tps = await TPS.findOne({ where: { barcode: tpsCode }, attributes: ['nama'] });
      const operator = await Operator.findOne({ where: { uniqueCode: operatorCode }, attributes: ['nama'] });
      const driver = await Driver.findOne({ where: { uniqueCode: driverCode }, attributes: ['nama'] });
      if (!tps) {
        return res.status(404).send('tps data not found');
      }
      if (!operator) {
        return res.status(404).send('operator data not found');
      }
      if (!driver) {
        return res.status(404).send('driver data not found');
      }
      if (!trashCode) {
        return res.status(400).send('kode sampah belum diisi');
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
      return res.status(200).send('schedule data updated successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('update error');
    }
  };

  //status updates
  otw = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Picking Up';
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('request data not found');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status });
      await history.update({ status });
      return res.status(200).send('request status successfuly updated');
    } catch (error) {
      console.error(error);
      return res.status(500).send('schedule deletion error');
    }
  };

  cancel = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { requesterCode } = req.body;
    const status = 'Cancled';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('request data not found');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status, updatedBy: requesterCode });
      await history.update({ status });
      return res.status(200).send('request status successfuly updated');
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
        return res.status(404).send('request data not found');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status, pickedAt: now, updatedBy: data.driverCode });
      await history.update({ status, pickedAt: now });
      return res.status(200).send('request status successfuly updated');
    } catch (error) {
      console.error(error);
      return res.status(500).send('schedule deletion error');
    }
  };

  complete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Completed';
    const now = DateManager.getTimestamp();

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('request data not found');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });
      const sampah = await Sampah.findOne({ where: { barcode: data.trashCode } });
      const tps = await TPS.findOne({ where: { barcode: data.requesterCode } });
      await data.update({ status, completedAt: now, updatedBy: data.driverCode });
      await history.update({ status, completedAt: now });
      await sampah.update({ status: 'Collected', latitude: tps.latitude, longitude: tps.longitude, updatedBy: data.driverCode });
      return res.status(200).send('request status successfuly updated');
    } catch (error) {
      console.error(error);
      return res.status(500).send('schedule deletion error');
    }
  };

  delayed = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Delayed';
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('request data not found');
      }
      const history = await History.findOne({ where: { requestCode: data.requestCode } });

      await data.update({ status, updatedBy: data.driverCode });
      await history.update({ status });
      return res.status(200).send('request status successfuly updated');
    } catch (error) {
      console.error(error);
      return res.status(500).send('schedule deletion error');
    }
  };
  //delete
  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('schedule data not found');
      }
      const current = data.requestCode;
      await data.destroy();
      return res.status(200).send(`record ${current} has been successfully deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('schedule deletion error');
    }
  };
}
export default new ScheduleController();
