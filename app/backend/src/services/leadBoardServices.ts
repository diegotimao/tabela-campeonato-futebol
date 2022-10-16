import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export default class LeadBoardServices {
  constructor(private teamsModel: typeof Teams) {}

  async getLeadBoard() {
    const response = await this.teamsModel.findAll({
      include: [
        { model: Matches, as: 'homeTeam', where: { inProgress: false } },
        { model: Matches, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    return response;
  }
}
