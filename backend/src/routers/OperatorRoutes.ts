import OperatorController from '../controllers/OperatorController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRoutes from './BaseRouter';

class OperatorRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', OperatorController.index);
    this.router.post('/', OperatorController.create);
    this.router.post('/register', OperatorController.register);
    this.router.post('/qr/generate/:id', OperatorController.createBarcode);
    this.router.put('/managetps/:id', OperatorController.updateTPS);
    this.router.get('/:id', OperatorController.show);
    this.router.put('/:id', OperatorController.update);
    this.router.delete('/:id', OperatorController.delete);
  }
}

export default new OperatorRoutes().router;
