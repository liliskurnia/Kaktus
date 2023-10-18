import UserController from '../controllers/UserController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRoutes from './BaseRouter';

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', UserController.index);
    this.router.get('/maxId', UserController.getMaxId);
    this.router.post('/', UserController.create);
    this.router.post('/check', UserController.userAdmin);
    this.router.get('/:id', UserController.show);
    this.router.put('/:id', UserController.update);
    this.router.delete('/:id', UserController.delete);
  }
}

export default new UserRoutes().router;
