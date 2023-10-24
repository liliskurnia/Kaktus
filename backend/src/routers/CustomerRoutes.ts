import CustomerController from '../controllers/CustomerController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRoutes from './BaseRouter';

class CustomerRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', CustomerController.index);
    this.router.post('/', CustomerController.create);
    this.router.post('/register', CustomerController.register);
    this.router.get('/listSampah/:id', CustomerController.getSampahList);
    this.router.get('/:id', CustomerController.show);
    this.router.put('/:id', CustomerController.update);
    this.router.put('/addPoints/:id', CustomerController.addPoint);
    this.router.delete('/:id', CustomerController.delete);
  }
}

export default new CustomerRoutes().router;