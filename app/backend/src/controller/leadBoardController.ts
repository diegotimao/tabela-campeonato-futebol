import { Request, Response, NextFunction } from 'express';
import LeadBoardServices from '../services/leadBoardServices';

export default class LeadBoardController {
  constructor(private leadBoardServices: LeadBoardServices) {}

  async getLeadBoardHome(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leadBoardServices.leadBoardHome();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async getLeadBoardAway(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leadBoardServices.leadBoardAway();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
