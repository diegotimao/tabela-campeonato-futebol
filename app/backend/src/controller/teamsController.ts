import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamServices';

export default class TeamsController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teamsAll = await TeamService.getAll();
      return res.status(200).json(teamsAll);
    } catch (error) {
      return next(error);
    }
  }
}
