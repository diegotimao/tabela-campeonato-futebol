import Matches from '../database/models/matches';

export default class MatchesServices {
  constructor(private matchesModel: typeof Matches) {}

  async getMatches() {
    const response = await this.matchesModel.findAll();

    return response;
  }
}
