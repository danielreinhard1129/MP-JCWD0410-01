import { createTransactionService } from '@/services/transaction/create-transaction.service';
import { getTransactionService } from '@/services/transaction/get-transaction.service';
import { getTransactionsService } from '@/services/transaction/get-transactions.service';
import { updateTransactionService } from '@/services/transaction/update-transaction.service';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getTransactionsService(Number(res.locals.user.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getTransactionService(Number(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createTransactionService(
        req.body,
        Number(res.locals.user.id),
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateTransactionService(
        Number(req.params.id),
        req.body,
        req.file!,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
