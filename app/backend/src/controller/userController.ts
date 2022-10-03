import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  public static async login(req: Request, res: Response) {
    const token = UserService.autentication(req.body);
    return res.status(200).json(token);
  }
}

export default UserController;
