import { createReviewService } from '@/services/review/create-review.service';
import { getReviewsService } from '@/services/review/get-reviews.service';
import { NextFunction, Request, Response } from 'express';

export class ReviewController {
  async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'desc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        userId: parseInt(req.query.userId as string) || 0,
      };

      const result = await getReviewsService(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //   async getTransaction(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const result = await getTransactionService(Number(req.params.id));
  //       res.status(200).send(result);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createReviewService(
        req.body,
        Number(res.locals.user.id),
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
