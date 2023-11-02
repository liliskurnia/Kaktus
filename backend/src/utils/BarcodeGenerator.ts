import qr from 'qrcode';
import fs from 'fs';

const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

class BarcodeGenerator {
  public static generateCode = (options?: any): string => {
    const { length, uppercaseAlphabet, lowercaseAlphabet, initialString, endingString, requestCode, trashType, requestType } = options;
    let RequestType = '';
    let characters = '0123456789';
    if (uppercaseAlphabet === true) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (lowercaseAlphabet === true) {
      characters += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (requestCode === true) {
      switch (requestType) {
        case 'SCHEDULED':
          RequestType = 'SP';
          break;
        case 'REQUEST':
          RequestType = 'CR';
          break;
        default:
          RequestType = '';
      }
      const date = new Date();
      let output: string = `${RequestType}-` || '';
      output += date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + '-';
      for (let i = 0; i < (length || 12); i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      output += `-${trashType}` || '';
      return output;
    }
    //default: 12 digit random number
    let output: string = initialString || '';
    for (let i = 0; i < (length || 12); i++) {
      output += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    output += endingString || '';
    return output;
  };

  public static generateImage = (barcode: string, path: string, options?: any) => {
    const { svgOut: svg, pngOut: png, pdfOut: pdf, title } = options;
    if (svg === true) {
      qr.toFile(`${path}/svgs/${barcode}.svg`, barcode, { errorCorrectionLevel: 'H', version: 3, type: 'svg' }, function (error: any) {
        if (error) throw error;
        console.log('qr code svg generated succesfully');
      });
    }
    if (png === true) {
      qr.toFile(`${path}/images/${barcode}.png`, barcode, { errorCorrectionLevel: 'H', version: 3, type: 'png' }, function (error: any) {
        if (error) throw error;
        console.log('qr code image generated succesfully');
      });
    }
    if (pdf === true || (pdf === null && svg === null && png === null)) {
      QRPDFFormatter(barcode, `${path}/pdfs/${barcode}.pdf`, title);
    }
  };
}

function QRPDFFormatter(barcode: string, outPath: string, title?: string): void {
  PDFDocument.prototype.addSVG = function (svg: any, x: any, y: any, options: any) {
    return SVGtoPDF(this, svg, x, y, options), this;
  };
  const doc = new PDFDocument({
    size: [170, 250],
    margins: 10,
  });
  doc.pipe(fs.createWriteStream(outPath));
  let svg: string = '';
  qr.toString(barcode, { errorCorrectionLevel: 'H', version: 3, type: 'svg' }, function (error: any, out: string) {
    if (error) throw error;
    svg = out;
  });

  doc.addSVG(svg, 0, 0);
  if (title) {
    doc.fontSize(11);
    doc.font('Helvetica-Bold').text(`${title}`, 0, 15, { width: 160, height: 25, align: 'center' });
  }
  doc.fontSize(9);
  doc.font('Helvetica-Bold').text(`${barcode}`, 0, 210, { width: 160, align: 'center' });

  doc.end();
  console.log('document generated');
}
export default BarcodeGenerator;
