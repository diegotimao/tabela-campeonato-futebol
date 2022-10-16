import { Response, Request, NextFunction } from 'express';
import LeadBoardServices from '../services/leadBoardServices';

export default class LeadBoradController {
  constructor(private leadBoardServices: LeadBoardServices) {}

  async getLeadBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leadBoardServices.leadBoardAll();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
