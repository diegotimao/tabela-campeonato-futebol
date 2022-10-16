import { Request, Response, NextFunction } from 'express';
import LeadBoarAwayService from '../services/leadBoardAwayService';

export default class LeadBoardAwayController {
  constructor(private leadBoardAwayServices: LeadBoarAwayService) {}

  async getLeadBoardAway(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leadBoardAwayServices.leadBoardAway();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
