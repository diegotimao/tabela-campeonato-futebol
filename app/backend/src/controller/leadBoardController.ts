import { Request, Response, NextFunction } from 'express';
import LeadBoardServices from '../services/leadBoardServices';

export default class LeadBoardController {
  constructor(private leadBoardController: LeadBoardServices) {}

  async getLeadBoardHome(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leadBoardController.leadBoardHome();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
