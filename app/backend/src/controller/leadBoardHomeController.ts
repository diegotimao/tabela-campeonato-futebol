import { Request, Response, NextFunction } from 'express';
import LeadBoardHomeServices from '../services/leadBoardServices';

export default class LeadBoardHomeController {
  constructor(private leadBoardHomeServices: LeadBoardHomeServices) {}

  async getLeadBoardHome(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leadBoardHomeServices.leadBoardHome();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
