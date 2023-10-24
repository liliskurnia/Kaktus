import CustomerController from '../controllers/CustomerController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRoutes from './BaseRouter';

class CustomerRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', CustomerController.index);
    this.router.post('/', CustomerController.create);
    this.router.post('/register', CustomerController.register);
    this.router.post('/generate', CustomerController.createBarcodeSampah);
    this.router.get('/listSampah/:id', CustomerController.getSampahList);
    this.router.post('/getBarcode', CustomerController.getSampahBarcodeOutput);
    this.router.get('/:id', CustomerController.show);
    this.router.put('/:id', CustomerController.update);
    this.router.put('/addPoints/:id', CustomerController.addPoint);
    this.router.delete('/:id', CustomerController.delete);
    // this.router.get('/download/:barcode', CustomerController.downloadBarcode);
  }
}

export default new CustomerRoutes().router;
