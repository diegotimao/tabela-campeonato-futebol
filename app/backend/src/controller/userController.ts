import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

class UserController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    // const token = await UserService.autentication(req.body);
    // return res.status(200).json(token);

    try {
      const token = await UserService.autentication(req.body);
      return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
