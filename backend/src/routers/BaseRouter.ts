import { Router } from 'express';

//Import Base Controller
import IRouter from './IRouter';

abstract class BaseRouter implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
