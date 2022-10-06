import Teams from '../database/models/teams';
import Exeption from '../utils/exeption';
import Matches from '../database/models/matches';

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
}
