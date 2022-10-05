import Exeption from '../utils/exeption';
import Teams from '../database/models/teams';

export default class TeamService {
  public static async getAll() {
    const teamsAll = await Teams.findAll();

    if (teamsAll.length <= 0) throw new Exeption(400, 'Notfound');

    return teamsAll;
  }

  public static async getOne(id: number) {
    const oneTeam = await Teams.findOne({
      where: { id },
    });

    return oneTeam;
  }
}
