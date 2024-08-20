import { AuthController } from '@/controllers/auth.controller';
import { VoucherController } from '@/controllers/voucher.controller';
import { verifyToken } from '@/lib/verifyToken';
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

    this.router.post('/createvoucher', this.voucherController.createVoucher);
  }

  getRouter(): Router {
    return this.router;
  }
}
