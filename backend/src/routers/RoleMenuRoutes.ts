import RoleMenuController from '../controllers/RoleMenuController';
// import validate from "../middleware/RoleMenuValidator";
import BaseRoutes from './BaseRouter';

class RoleMenuRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', RoleMenuController.index);
    this.router.post('/', RoleMenuController.create);
    this.router.get('/:id', RoleMenuController.show);
    this.router.put('/:id', RoleMenuController.update);
    this.router.delete('/:id', RoleMenuController.delete);
  }
}

export default new RoleMenuRoutes().router;
