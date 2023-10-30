import CustomerController from '../controllers/CustomerController';
import { auth } from '../middlewares/AuthMiddleware';
import validateCReg from '../middlewares/CustomerValidator';
import BaseRoutes from './BaseRouter';

class CustomerRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', CustomerController.index);
    this.router.post('/', CustomerController.create);
    this.router.post('/register', validateCReg, CustomerController.register);
    this.router.post('/qr/generate/:id', CustomerController.createBarcode);
    this.router.get('/listSampah/:id', CustomerController.getSampahList);
    this.router.get('/:id', CustomerController.show);
    this.router.put('/:id', CustomerController.update);
    this.router.put('/addPoints/:id', CustomerController.addPoint);
    this.router.delete('/:id', CustomerController.delete);
  }
}

export default new CustomerRoutes().router;
