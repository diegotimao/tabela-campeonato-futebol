import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamServices';

export default class TeamsController {
  constructor(private teamsService: TeamService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teamsAll = await this.teamsService.getAll();
      return res.status(200).json(teamsAll);
    } catch (error) {
      return next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const oneTeam = await this.teamsService.getOne(Number(req.params.id));
      return res.status(200).json(oneTeam);
    } catch (error) {
      return next(error);
    }
  }
}
