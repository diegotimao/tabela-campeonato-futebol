import IMatchesCreateDTO from '../dto/matchesDTO';
import Teams from '../database/models/teams';
import Exeption from '../utils/exeption';
import Matches from '../database/models/matches';
// import IMatchesGoals from '../dto/updatedGoalsDTO';

export default class MatchesServices {
  constructor(private matchesModel: typeof Matches) {}

  async getMatches(): Promise<Matches[]> {
    const response = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    if (response.length <= 0) throw new Exeption(400, 'Notfound');
    return response;
  }

  async getMatchesProgress(params: boolean) {
    const response = await this.matchesModel.findAll({
      where: { inProgress: params },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return response;
  }

  async createMatches(params: IMatchesCreateDTO) {
    if (params.awayTeam === params.homeTeam) {
      throw new Exeption(401, 'It is not possible to create a match with two equal teams');
    }

    const existAwayTeam = await this.matchesModel.findByPk(params.awayTeam);
    const existHomeTeam = await this.matchesModel.findByPk(params.homeTeam);

    if (!existAwayTeam || !existHomeTeam) {
      throw new Exeption(404, 'There is no team with such id!');
    }

    const response = await this.matchesModel.create(params);
    return response;
  }

  async updatedMatches(id: number) {
    const insertId = await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );

    return insertId;
  }

  // async updatedGoals(params: IMatchesGoals) {
  //   const insertId = await this.matchesModel.update(
  //     { homeTeamGoals: params.homeTeamGoals },
  //     { awayTeamGoals: params.awayTeamGoals },
  //     { where: { id } },
  //   );
  // }
}
