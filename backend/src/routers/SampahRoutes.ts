import SampahController from '../controllers/SampahController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRouter from './BaseRouter';

class SampahRoutes extends BaseRouter {
  public routes(): void {
    this.router.get('/', SampahController.index);
    this.router.get('/:id', SampahController.show);
    this.router.post('/', SampahController.create);
    this.router.put('/:id', SampahController.update);
    this.router.put('/location/:id', SampahController.updateLocation);
    this.router.put('/status/:id', SampahController.updateStatus);
    this.router.delete('/:id', SampahController.delete);
  }
}

export default new SampahRoutes().router;
