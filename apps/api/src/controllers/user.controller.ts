import { getUserService } from '@/services/user/get-user.service';
import { getUsersService } from '@/services/user/get-users.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUsersService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUserService(Number(req.params.id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
