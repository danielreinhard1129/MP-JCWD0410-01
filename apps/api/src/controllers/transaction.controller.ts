import { getTransactionsService } from '@/services/transaction/get-transactions.service';
import { NextFunction, Request, Response } from 'express';
import { Status, PaymentMethod } from '@prisma/client'; // Pastikan untuk mengimpor enum Status dan PaymentMethod dari Prisma

export class TransactionController {
  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 10,
        sortOrder: (req.query.sortOrder as string) || 'desc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: req.query.status ? (req.query.status as Status) : undefined,
        paymentMethod: req.query.paymentMethod
          ? (req.query.paymentMethod as PaymentMethod)
          : undefined,
      };

      const result = await getTransactionsService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
