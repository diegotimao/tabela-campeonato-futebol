import { Request, Response, NextFunction } from 'express';
import Exeption from '../utils/exeption';
import UserService from '../services/userService';

class UserController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await UserService.autentication(req.body);
      return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }
  }

  public static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('authorization');
      if (!token) throw new Exeption(400, 'token notgound');
      const role = await UserService.validate(token);
      return res.status(200).json({ role });
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
