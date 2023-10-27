'use strict';
import { Request, Response } from 'express';
import IController from './IController';
import BarcodeGenerator from '../utils/BarcodeGenerator';

const fs = require('fs');
const qrFolderPath = './public/qrcodes';

const db = require('../db/models');
const RequestDB = db.master_request;
const DriverHistory = db.accepted_request_history;
const CustomerHistory = db.customer_request_history;
const History = db.master_request_history;
const Driver = db.master_driver;
const Customer = db.master_customer;

class RequestController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await RequestDB.findAll();
      if (data.length === 0) {
        return res.status(400).send('belum ada data');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to fetch all request data');
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('the specified customer request data not found');
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to fetch selected request');
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
      return res.status(500).send('error fetching request history');
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('customer request data not found');
      }
      const cHistory = await CustomerHistory.findOne({ where: { requestcode: data.requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode: data.requestCode } });

      if (cHistory) {
        await cHistory.destroy();
      }
      if (dHistory) {
        await dHistory.destroy();
      }
      await data.destroy();
      return res.status(200).send('customer request data berhasil dihapus');
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to delete selected request');
    }
  };

  request = async (req: Request, res: Response): Promise<Response> => {
    const { masterCustomerId, trashTypeId, programName, createdBy } = req.body;

    try {
      const customer = await Customer.findByPk({ id: masterCustomerId });
      if (!customer) {
        return res.status(404).send('customer info not found');
      }
      const jenis = await db.jenisSampah.findByPk({ id: trashTypeId });
      let requestCode = BarcodeGenerator.generateRequestCode('CR', jenis.kode, 16, true);
      let exist = await RequestDB.findOne({ where: { requestCode } });
      while (exist) {
        requestCode = BarcodeGenerator.generateRequestCode('CR', jenis.kode, 16, true);
        exist = await RequestDB.findOne({ where: { requestCode } });
      }

      let trashCode = `${BarcodeGenerator.generateCode('', 16, true)}-${jenis.kode}`;
      exist = await db.sampah_master.findOne({ where: { barcode: trashCode } });
      while (exist) {
        trashCode = `${BarcodeGenerator.generateCode('', 16, true)}-${jenis.kode}`;
        exist = await db.sampah_master.findOne({ where: { barcode: trashCode } });
      }
      const jenisSampah = `${jenis.kode}-${jenis.nama}`;
      //create a new sampah barcode for customer
      await db.sampah_master.create({
        masterCustomerId: customer.id,
        jenisSampahId: trashTypeId,
        jenisSampah,
        barcode: trashCode,
      });
      //generate barcode image for sampah
      BarcodeGenerator.generateImage(trashCode, qrFolderPath, jenisSampah);

      //creates request at the request db collections
      await RequestDB.create({
        requestCode,
        customerCode: customer.uniqueCode,
        customerNik: customer.nik,
        customerName: customer.nama,
        customerPhone: customer.telp,
        trashCode,
        trashType: jenisSampah,
        programName,
        createdBy,
      });

      //create customer's history
      await CustomerHistory.create({
        requestCode,
        masterCustomerId: customer.id,
        trashCode,
        trashType: jenisSampah,
      });

      //writes the transaction to the master history table
      await History.create({
        requestCode,
        requestType: 'REQUEST',
        requesterCode: customer.uniqueCode,
        requesterNik: customer.nik,
        requesterName: customer.nama,
        requesterPhone: customer.telp,
        requesterGender: customer.gender,
        trashCode,
        trashType: jenisSampah,
        status: 'Requested',
      });

      return res.status(200).send(`request pickup berhasil dibuat, request id: ${requestCode}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('request creation error');
    }
  };

  accept = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { driverCode, programName } = req.body;
    const status = 'Accepted';
    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send("the requested data doesn't exist");
      }
      const requestCode = data.requestCode;
      const reqHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });
      const driver = await Driver.findOne({ where: { uniqueCode: driverCode } });
      if (!driver) {
        return res.status(404).send('driver data not found');
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
      });
      await history.update({
        status,
        driverCode,
        driverNik: driver.nik,
        driverName: driver.nama,
        driverPhone: driver.telp,
      });
      await DriverHistory.create({
        requestCode,
        requestType: 'REQUEST',
        masterDriverId: driver.id,
        trashCode: data.trashCode,
        trashType: data.trashType,
        customerCode: data.customerCode,
        customerNik: data.customerNik,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
      });
      return res.status(200).send('request successfuly accepted');
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to update status');
    }
  };

  cancel = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Cancled';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('customer request data not found');
      }
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send('status has been successfuly updated to cancled');
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to update status');
    }
  };

  delayed = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Delayed';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('customer request data not found');
      }
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send('status has been successfuly updated to cancled');
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to update status');
    }
  };

  otw = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Picking Up';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('customer request data not found');
      }
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send('status has been successfuly updated to cancled');
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to update status');
    }
  };

  pickedup = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Picked Up';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('customer request data not found');
      }
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send('status has been successfuly updated to cancled');
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to update status');
    }
  };

  complete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const status = 'Completed';

    try {
      const data = await RequestDB.findByPk(id);
      if (!data) {
        return res.status(404).send('customer request data not found');
      }
      const requestCode = data.requestCode;
      const cHistory = await CustomerHistory.findOne({ where: { requestCode } });
      const dHistory = await DriverHistory.findOne({ where: { requestCode } });
      const history = await History.findOne({ where: { requestCode } });

      await data.update({ status });
      await cHistory.update({ status });
      await dHistory.update({ status });
      await history.update({ status });

      return res.status(200).send('status has been successfuly updated to cancled');
    } catch (error) {
      console.error(error);
      return res.status(500).send('unable to update status');
    }
  };
}
export default new RequestController();
