const qr = require('qrcode');
// const imgToPDF = require('image-to-pdf');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

class BarcodeGenerator {
  public static generateCode = (code?: string, digits?: number, alphaNumeric?: boolean): string => {
    const length: number = digits || 16;
    const alphanumeric: boolean = alphaNumeric || false;
    const initial: string = code || '';

    if (alphanumeric === false) {
      let maxString = '';
      for (let i = 0; i < length; i++) {
        maxString += '9';
      }
      const maxValue = parseInt(maxString);
      const id = Math.floor(Math.random() * maxValue);
      const output: string = `${initial}${id}`;
      return output;
    } else {
      let output: string = initial;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return output;
    }
  };

  public static generateRequestCode = (requestType: string, trashTypeCode: string, digits?: number, alphaNumeric?: boolean): string => {
    const length: number = digits || 16;
    const alphanumeric: boolean = alphaNumeric || false;
    const trashType: string = `-${trashTypeCode}` || '';
    const d = new Date();
    const year: string = d.getFullYear().toString();
    const month: string = d.getMonth().toString();
    const day: string = d.getDate().toString();
    if (alphanumeric === false) {
      let maxString = '';
      for (let i = 0; i < length; i++) {
        maxString += '9';
      }
      const maxValue = parseInt(maxString);
      const id = Math.floor(Math.random() * maxValue);
      const output: string = `${requestType}-${year}${month}${day}-${id}${trashType}`;
      return output;
    } else {
      let output: string = `${requestType}-${year}${month}${day}-`;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      output += trashType;
      return output;
    }
  };

  public static generateImage = (barcode: string, path: string, title?: string) => {
    qr.toFile(`${path}/svgs/${barcode}.svg`, barcode, { errorCorrectionLevel: 'H', version: 3, type: 'svg' }, function (error: any) {
      if (error) throw error;
      console.log('qr code svg generated succesfully');
    });
    qr.toFile(`${path}/images/${barcode}.png`, barcode, { errorCorrectionLevel: 'H', version: 3, type: 'png' }, function (error: any) {
      if (error) throw error;
      console.log('qr code image generated succesfully');
    });

    QRPDFFormatter(barcode, `${path}/pdfs/${barcode}.pdf`, title);
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
    doc.font('Helvetica-Bold').text(`${title}`, 0, 35, { width: 170, align: 'center' });
  }
  doc.fontSize(9);
  doc.font('Helvetica-Bold').text(`${barcode}`, 0, 210, { width: 170, align: 'center' });

  doc.end();
  console.log('document generated');
}

function cmToPt(x: number): number {
  const conversionRate = 28.3464549073;
  return x * conversionRate;
}
export default BarcodeGenerator;
