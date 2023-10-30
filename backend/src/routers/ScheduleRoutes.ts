import ScheduleController from '../controllers/ScheduleController';
import { auth } from '../middlewares/AuthMiddleware';
import validateSchedule from '../middlewares/SchedulingValidator';
import BaseRoutes from './BaseRouter';

class ScheduleRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', ScheduleController.index);
    this.router.get('/:id', ScheduleController.show);
    this.router.get('/tps/:tpId', ScheduleController.indexByTps);
    this.router.delete('/:id', ScheduleController.delete);
    this.router.post('/', validateSchedule, ScheduleController.create);
    this.router.put('/:id', ScheduleController.update);
    this.router.put('/cancel/:id', ScheduleController.cancel);
    this.router.put('/delayed/:id', ScheduleController.delayed);
    this.router.put('/pickingup/:id', ScheduleController.otw);
    this.router.put('/pickedup/:id', ScheduleController.pickedup);
    this.router.put('/complete/:id', ScheduleController.complete);
  }
}

export default new ScheduleRoutes().router;
