const qr = require('qrcode');
const imgToPDF = require('image-to-pdf');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

class BarcodeGenerator {
  public static generateCode = (code?: string, digits?: number, alphaNumeric?: boolean): string => {
    const length = digits || 12;
    const alphanumeric = alphaNumeric || false;
    const year = new Date().getFullYear().toString();
    const initial = code || '';

    if (alphanumeric === false) {
      let maxString = '';
      for (let i = 0; i < length; i++) {
        maxString += '9';
      }
      const maxValue = parseInt(maxString);
      const id = Math.floor(Math.random() * maxValue);
      const output: string = `${initial}${year}${id}`;
      return output;
    } else {
      let output: string = code + year;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
      }
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
    // const pages = [`./public/qrcodes/images/${barcode}.png`];
    // imgToPDF(pages, imgToPDF.sizes.A6).pipe(fs.createWriteStream(`./public/qrcodes/pdfs/${barcode}.pdf`));
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
