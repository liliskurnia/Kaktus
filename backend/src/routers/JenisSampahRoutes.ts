import JenisSampahController from '../controllers/JenisSampahController';
import BaseRouter from './BaseRouter';

class SampahRoutes extends BaseRouter {
  public routes(): void {
    this.router.get('/', JenisSampahController.index);
    this.router.get('/:id', JenisSampahController.show);
    this.router.post('/', JenisSampahController.create);
    this.router.put('/:id', JenisSampahController.update);
    this.router.delete('/:id', JenisSampahController.delete);
  }
}

export default new SampahRoutes().router;
