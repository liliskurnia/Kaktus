import SampahController from '../controllers/SampahController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRouter from './BaseRouter';

class SampahRoutes extends BaseRouter {
  public routes(): void {
    this.router.get('/', SampahController.index);
    this.router.get('/:id', SampahController.show);
    this.router.post('/', SampahController.create);
    this.router.post('/:id', SampahController.update);
    this.router.post('/status/:id', SampahController.updateStatus);
  }
}

export default new SampahRoutes().router;
