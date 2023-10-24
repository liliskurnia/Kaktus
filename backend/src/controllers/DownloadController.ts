'use strict';
import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import IController from './IController';

const qrFolderPath = './public/qrcodes';

class DownloadController {
  QRPNGDownload = (req: Request, res: Response) => {
    const { barcode } = req.params;
    res.download(`./public/qrcodes/images/${barcode}.png`);
  };
  QRSVGDownload = (req: Request, res: Response) => {
    const { barcode } = req.params;
    res.download(`./public/qrcodes/svgs/${barcode}.svg`);
  };
  QRPDFDownload = (req: Request, res: Response) => {
    const imgToPDF = require('image-to-pdf');
    const fs = require('fs');
    const { barcode } = req.params;

    const pages = [`./public/qrcodes/images/${barcode}.png`];

    imgToPDF(pages, imgToPDF.sizes.A6).pipe(fs.createWriteStream(`./public/qrcodes/pdfs/${barcode}.pdf`));
    res.download(`./public/qrcodes/pdfs/${barcode}.pdf`);
  };
}

export default new DownloadController();
