import { Request, Response, NextFunction } from 'express';
import Exeption from '../utils/exeption';
import MatchesServices from '../services/matcheServices';
import AuthToken from '../utils/authToken';

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

  async createMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('authorization');
      if (!token) throw new Exeption(401, 'Token must be a valid token');
      const auth = new AuthToken();

      const isAutorized = await auth.autenticateToken(token);
      if (isAutorized) {
        const response = await this.matheServices.createMatches(req.body);

        return res.status(201).json(response);
      }
    } catch (error) {
      return next(error);
    }
  }

  async updatedMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('authorization');
      if (!token) throw new Exeption(401, 'Token must be a valid token');
      const auth = new AuthToken();
      const isAutorized = await auth.autenticateToken(token);

      if (isAutorized) {
        const { id } = req.params;
        await this.matheServices.updatedMatches(Number(id));
        return res.status(200).json({ message: 'Finished' });
      }
    } catch (error) {
      return next(error);
    }
  }
}
