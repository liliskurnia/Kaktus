'use strict';
import { Request, Response } from 'express';
import BarcodeGenerator from '../utils/BarcodeGenerator';
import DateManager from '../utils/DateManager';

const qrFolderPath = './public/qrcodes';

const db = require('../db/models');
const RequestDB = db.master_pickup;
const DriverHistory = db.accepted_request_history;
const CustomerHistory = db.customer_request_history;
const History = db.master_pickup_history;
const Driver = db.master_driver;
const Customer = db.master_customer;

const requestType = 'REQUEST';

class RequestController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await RequestDB.findAll({ where: { requestType } });
      if (data.length === 0) {
        return res.status(400).send('belum ada data');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil semua data request customer');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request customer yang dicari tidak ditemukan');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data request customer yang dicari');
    }
  };

  fetchCustomerHistory = async (req: Request, res: Response): Promise<Response> => {
    const { masterCustomerId } = req.params;
    try {
      const data = await CustomerHistory.findAll({ where: { masterCustomerId } });
      if (data.length === 0) {
        return res.status(400).send('belum ada data');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data histori request customer');
    }
  };

  fetchDriverHistory = async (req: Request, res: Response): Promise<Response> => {
    const { masterDriverId } = req.params;
    try {
      const data = await DriverHistory.findAll({ where: { masterDriverId } });
      if (data.length === 0) {
        return res.status(400).send('belum ada data');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil data histori driver');
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request customer tidak ditemukan');
      }
      const cHistory = await CustomerHistory.findOne({ where: { requestCode: data.requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode: data.requestCode } });

      if (cHistory) {
        await cHistory.destroy();
      }
      if (dHistory) {
        await dHistory.destroy();
      }
      await data.destroy();
      return res.status(200).send('data request customer berhasil dihapus');
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal menghapus data yang dipilih');
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { masterCustomerId, trashTypeId, scheduledDate, programName } = req.body;

    try {
      const customer = await Customer.findByPk(masterCustomerId);
      if (!customer) {
        return res.status(404).send('data customer tidak ditemukan');
      }
      const jenis = await db.jenis_sampah.findByPk(trashTypeId);
      let requestCode = BarcodeGenerator.generateCode({ length: 16, requestCode: true, requestType, trashType: jenis.kode, uppercaseAlphabet: true });
      let exist = await RequestDB.findOne({ where: { requestCode } });
      while (exist) {
        requestCode = BarcodeGenerator.generateCode({ length: 16, requestCode: true, requestType, trashType: jenis.kode, uppercaseAlphabet: true });
        exist = await RequestDB.findOne({ where: { requestCode } });
      }

      let trashCode = `${BarcodeGenerator.generateCode({ length: 16, uppercaseAlphabet: true })}-${jenis.kode}`;
      exist = await db.sampah_master.findOne({ where: { barcode: trashCode } });
      while (exist) {
        trashCode = `${BarcodeGenerator.generateCode({ length: 16, uppercaseAlphabet: true })}-${jenis.kode}`;
        exist = await db.sampah_master.findOne({ where: { barcode: trashCode } });
      }
      const jenisSampah = `${jenis.kode}-${jenis.nama}`;
      //create a new sampah barcode for customer
      await db.sampah_master.create({
        ownerCode: customer.uniqueCode,
        jenisSampahId: trashTypeId,
        jenisSampah,
        barcode: trashCode,
        status: 'Active',
      });
      //generate barcode image for sampah
      BarcodeGenerator.generateImage(trashCode, qrFolderPath, { title: jenis.nama, pngOut: true, pdfOut: true });

      //creates request at the request db collections
      await RequestDB.create({
        requestCode,
        requestType,
        requesterCode: customer.uniqueCode,
        requesterNik: customer.nik,
        requesterName: customer.nama,
        requesterPhone: customer.telp,
        requesterGender: customer.gender,
        trashCode,
        trashType: jenisSampah,
        scheduledDate,
        programName,
        createdBy: customer.uniqueCode,
      });

      //create customer's history
      await CustomerHistory.create({
        requestCode,
        masterCustomerId: customer.id,
        trashCode,
        trashType: jenisSampah,
        status: 'Requested',
      });

      //writes the transaction to the master history table
      await History.create({
        requestCode,
        requestType,
        requesterCode: customer.uniqueCode,
        requesterNik: customer.nik,
        requesterName: customer.nama,
        requesterPhone: customer.telp,
        requesterGender: customer.gender,
        scheduledDate,
        trashCode,
        trashType: jenisSampah,
        status: 'Requested',
      });

      return res.status(200).send(`request pickup berhasil dibuat, request id: ${requestCode}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal membuat request');
    }
  };

  accept = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { driverCode, programName } = req.body;
    const status = 'Accepted';
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request yang dipilih tidak dapat ditemukan');
      }
      const requestCode = data.requestCode;
      const reqHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });
      const driver = await Driver.findOne({ where: { uniqueCode: driverCode } });
      if (!driver) {
        return res.status(404).send('data driver tidak ditemukan');
      }
      await data.update({
        status,
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
        programName,
        updatedBy: driverCode,
      });
      await reqHistory.update({
        status,
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
        driverGender: driver.gender,
      });
      await history.update({
        status,
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
        driverGender: driver.gender,
      });

      const driverHistoryExist = await DriverHistory.findOne({ where: { requestCode } });
      if (driverHistoryExist) {
        await DriverHistory.update({
          requestCode,
          requestType,
          masterDriverId: driver.id,
          trashCode: data.trashCode,
          trashType: data.trashType,
          customerCode: data.requesterCode,
          customerNik: data.requesterNik,
          customerName: data.requesterName,
          customerPhone: data.requesterPhone,
        });
        return res.status(200).send('berhasil mengambil request');
      }
      await DriverHistory.create({
        requestCode,
        requestType,
        masterDriverId: driver.id,
        trashCode: data.trashCode,
        trashType: data.trashType,
        customerCode: data.requesterCode,
        customerNik: data.requesterNik,
        customerName: data.requesterName,
        customerPhone: data.requesterPhone,
      });
      return res.status(200).send('berhasil mengambil request');
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengambil request');
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
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status, updatedBy: requesterCode });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send("berhasil mengubah status request menjadi 'Canceled'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengubah status request');
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
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status, updatedBy: data.driverCode });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send("berhasil mengubah status request menjadi'Delayed'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengubah status request');
    }
  };

  otw = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Picking Up';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status, updatedBy: data.driverCode });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send("berhasil mengubah status request menjadi'Picking-Up'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengubah status request');
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
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status, pickedAt: now, updatedBy: data.driverCode });
      await cHistory.update({ status, pickedAt: now });
      await dHistory.update({ status, pickedAt: now });
      await history.update({ status, pickedAt: now });

      return res.status(200).send("berhasil mengubah status request menjadi 'Picked-Up'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengubah status request');
    }
  };

  complete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { tpsCode } = req.body;
    const status = 'Completed';
    const now = DateManager.getTimestamp();

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('data request tidak dapat ditemukan');
      }
      const requestCode = data.requestCode;
      const barcode = data.trashCode;
      const tps = await db.tps.findOne({ where: { barcode: tpsCode } });
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });
      const sampah = await db.sampah_master.findOne({ where: { barcode } });

      await data.update({ status, completedAt: now, updatedBy: data.driverCode });
      await cHistory.update({ status, completedAt: now });
      await dHistory.update({ status, completedAt: now });
      await history.update({ status, completedAt: now });
      await sampah.update({ status: 'Collected', latitude: tps.latitude, longitude: tps.longitude, updatedBy: data.driverCode });

      return res.status(200).send("berhasil mengubah status request menjadi'Completed'");
    } catch (error) {
      console.error(error);
      return res.status(500).send('gagal mengubah status request');
    }
  };
}
export default new RequestController();
