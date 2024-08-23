import { TransactionUserController } from '@/controllers/transaction-user.controller';
import { TransactionController } from '@/controllers/transaction.controller';
import { uploader } from '@/lib/multer';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class TransactionUserRouter {
  private router: Router;
  private transactionUserController: TransactionUserController;

  constructor() {
    this.transactionUserController = new TransactionUserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      verifyToken,
      this.transactionUserController.getTransactions,
    );
    this.router.get('/:id', this.transactionUserController.getTransaction);
    this.router.post(
      '/',
      verifyToken,
      this.transactionUserController.createTransaction,
    );
    this.router.patch(
      '/:id',
      verifyToken,
      uploader().single('paymentProof'),
      this.transactionUserController.updateTransaction,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
