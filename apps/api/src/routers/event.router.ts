import { EventController } from '@/controllers/event.controller';
import { uploader } from '@/lib/multer';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.eventController.getEvents);
    this.router.get('/:id', this.eventController.getEvent);
    this.router.post(
      '/',
      verifyToken,
      uploader().single('thumbnail'),
      this.eventController.createEvent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
