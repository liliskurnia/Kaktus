import DownloadController from '../controllers/DownloadController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRoutes from './BaseRouter';

class CustomerRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/svgQR/:barcode', DownloadController.QRSVGDownload);
    this.router.get('/pngQR/:barcode', DownloadController.QRPNGDownload);
    this.router.get('/pdfQR/:barcode', DownloadController.QRPDFDownload);
  }
}

export default new CustomerRoutes().router;
