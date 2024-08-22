import { VoucherController } from '@/controllers/voucher.controller';
import { Router } from 'express';

export class VoucherRouter {
  private router: Router;
  private voucherController: VoucherController;

  constructor() {
    this.voucherController = new VoucherController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.voucherController.getVouchers);
    this.router.post('/', this.voucherController.createVoucher);
  }

  getRouter(): Router {
    return this.router;
  }
}
