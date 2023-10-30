import BaseRouter from './BaseRouter';
import AuthController from '../controllers/AuthController';
import validateAuth from '../middlewares/AuthValidator';
// import resetValidate from '../middlewares/ResetValidator';
import { auth } from '../middlewares/AuthMiddleware';
// import { resetAuth } from '../middlewares/ResetMiddleware';

class AuthRoutes extends BaseRouter {
  public routes(): void {
    this.router.post('/register', validateAuth, AuthController.register);
    this.router.post('/login', validateAuth, AuthController.login);
    this.router.get('/profile', auth, AuthController.profile);
    // this.router.put('/reset', resetValidate, resetAuth, AuthController.resetPassword );
  }
}

export default new AuthRoutes().router;
