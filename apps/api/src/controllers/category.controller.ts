import { getCategoriesService } from '@/services/category/get-categories.service';
import { createCategoryService } from '@/services/category/create-category.service';
import { NextFunction, Request, Response } from 'express';

export class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getCategoriesService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createCategoryService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
