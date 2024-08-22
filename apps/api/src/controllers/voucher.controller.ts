import { createVoucherService } from '@/services/voucher/create-voucher.service';
import { getVouchersService } from '@/services/voucher/get-vouchers.Service';
import { NextFunction, Request, Response } from 'express';

export class VoucherController {
  async createVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createVoucherService(req.body);
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getVouchers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 10,
        sortOrder: (req.query.sortOrder as string) || 'desc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        eventId: req.query.eventId ? Number(req.query.eventId) : undefined,
      };

      const result = await getVouchersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
