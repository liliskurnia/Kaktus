import DriverController from '../controllers/DriverController';
import { auth } from '../middlewares/AuthMiddleware';
import validateDReg from '../middlewares/DriverValidator';
import BaseRoutes from './BaseRouter';

class DriverRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', DriverController.index);
    this.router.post('/', DriverController.create);
    this.router.post('/register', validateDReg, DriverController.register);
    this.router.post('/qr/generate/:id', DriverController.createBarcode);
    this.router.get('/:id', DriverController.show);
    this.router.put('/:id', DriverController.update);
    this.router.put('/geo/:id', DriverController.updateLocation);
    this.router.put('/managetps/:id', DriverController.updateTPS);
    this.router.put('/addPoints/:id', DriverController.addPoint);
    this.router.delete('/:id', DriverController.delete);
  }
}

export default new DriverRoutes().router;
