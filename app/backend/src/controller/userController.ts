import { Request, Response, NextFunction } from 'express';
import Exeption from '../utils/exeption';
import UserService from '../services/userService';

class UserController {
  constructor(private userService: UserService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.userService.autentication(req.body);
      return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('authorization');
      if (!token) throw new Exeption(400, 'token notgound');
      const role = await this.userService.validate(token);
      return res.status(200).json({ role });
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
