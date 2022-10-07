import { Request, Response, NextFunction } from 'express';
import MatchesServices from '../services/matcheServices';

export default class MatchesController {
  constructor(private matheServices: MatchesServices) {}

  async getMatches(req: Request, res: Response, next: NextFunction) {
    try { // ?inProgress=true
      const query = req.query.inProgress;
      if (typeof query === 'string') {
        const response = await this.matheServices.getMatchesProgress(JSON.parse(query));
        return res.status(200).json(response);
      }
      const response = await this.matheServices.getMatches();
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
