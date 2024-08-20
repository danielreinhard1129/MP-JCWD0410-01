import { CategoryController } from '@/controllers/category.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class CategoryRouter {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.categoryController = new CategoryController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.categoryController.getCategories);
    this.router.post('/', verifyToken, this.categoryController.createCategory);
  }

  getRouter(): Router {
    return this.router;
  }
}
