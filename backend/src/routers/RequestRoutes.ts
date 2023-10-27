import RequestController from '../controllers/RequestController';
import { auth } from '../middlewares/AuthMiddleware';
import BaseRoutes from './BaseRouter';

class RequestRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', RequestController.index);
    this.router.get('/:id', RequestController.show);
    this.router.get('/:masterCustomerId', RequestController.fetchCustomerHistory);
    this.router.delete('/:id', RequestController.delete);
    this.router.post('/', RequestController.request);
    this.router.put('/accept/:id', RequestController.accept);
    this.router.put('/cancel/:id', RequestController.cancel);
    this.router.put('/delayed/:id', RequestController.delayed);
    this.router.put('/pickingup/:id', RequestController.otw);
    this.router.put('/pickedup/:id', RequestController.pickedup);
    this.router.put('/complete/:id', RequestController.complete);
  }
}

export default new RequestRoutes().router;
