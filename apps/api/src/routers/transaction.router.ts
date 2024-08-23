import { TransactionController } from '@/controllers/transaction.controller';
import { uploader } from '@/lib/multer';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      verifyToken,
      this.transactionController.getTransactions,
    );
    this.router.get('/:id', this.transactionController.getTransaction);
    this.router.post(
      '/',
      verifyToken,
      this.transactionController.createTransaction,
    );
    this.router.patch(
      '/:id',
      verifyToken,
      uploader().single('paymentProof'),
      this.transactionController.updateTransaction,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
