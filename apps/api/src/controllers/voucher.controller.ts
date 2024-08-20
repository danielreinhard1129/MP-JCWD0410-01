import { voucherService } from '@/services/voucher/voucher.service';
import { NextFunction, Request, Response } from 'express';

export class VoucherController {
  async createVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await voucherService(req.body);
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
}
