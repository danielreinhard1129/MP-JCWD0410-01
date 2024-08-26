import { ReviewController } from '@/controllers/review.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class ReviewRouter {
  private router: Router;
  private reviewController: ReviewController;

  constructor() {
    this.reviewController = new ReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.reviewController.getReviews);
    this.router.post('/', verifyToken, this.reviewController.createReview);
  }

  getRouter(): Router {
    return this.router;
  }
}
