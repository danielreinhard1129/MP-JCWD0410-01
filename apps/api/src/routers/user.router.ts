import { CategoryController } from '@/controllers/category.controller';
import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.userController.getUsers);
    this.router.get('/:id', this.userController.getUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
