import { Request, Response, NextFunction } from 'express';
import MatchesServices from '../services/matcheServices';

export default class MatchesController {
  constructor(private matheServices: MatchesServices) {}

  async getMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.matheServices.getMatches();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
