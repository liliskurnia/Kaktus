import TPSController from '../controllers/TPSController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRouter from './BaseRouter';

class TPSRoutes extends BaseRouter {
  public routes(): void {
    this.router.get('/', TPSController.index);
    this.router.get('/:id', TPSController.show);
    this.router.post('/', TPSController.create);
    this.router.post('/qr/generate/:id', TPSController.createBarcode);
    this.router.put('/:id', TPSController.update);
    this.router.put('/status/:id', TPSController.updateStatus);
    this.router.delete('/:id', TPSController.delete);
  }
}

export default new TPSRoutes().router;
