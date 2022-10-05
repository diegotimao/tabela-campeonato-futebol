import Exeption from '../utils/exeption';
import Teams from '../database/models/teams';

export default class TeamService {
  constructor(private teamsModel: typeof Teams) {}

  async getAll() {
    const teamsAll = await this.teamsModel.findAll();
    if (teamsAll.length <= 0) throw new Exeption(400, 'Notfound');
    return teamsAll;
  }

  async getOne(id: number) {
    const oneTeam = await this.teamsModel.findByPk(id);

    if (!oneTeam) throw new Exeption(400, 'Notfound');

    return oneTeam;
  }
}
