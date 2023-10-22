import DriverController from '../controllers/DriverController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRoutes from './BaseRouter';

class DriverRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', DriverController.index);
    this.router.post('/', DriverController.create);
    this.router.post('/register', DriverController.register);
    this.router.get('/:id', DriverController.show);
    this.router.put('/:id', DriverController.update);
    this.router.put('/addPoints/:id', DriverController.addPoint);
    this.router.delete('/:id', DriverController.delete);
  }
}

export default new DriverRoutes().router;
