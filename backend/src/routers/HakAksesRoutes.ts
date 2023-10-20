import HakAksesController from '../controllers/HakAksesController';
import BaseRoutes from './BaseRouter';

class HakAksesRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', HakAksesController.index);
    this.router.post('/', HakAksesController.create);
    this.router.get('/:id', HakAksesController.show);
    this.router.post('/access', HakAksesController.getAccess);
    this.router.put('/:id', HakAksesController.update);
    this.router.delete('/:id', HakAksesController.delete);
  }
}

export default new HakAksesRoutes().router;
