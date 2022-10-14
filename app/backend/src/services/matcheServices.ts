import IMatchesCreateDTO from '../dto/matchesDTO';
import Teams from '../database/models/teams';
import Exeption from '../utils/exeption';
import Matches from '../database/models/matches';
import IMatchesGoals from '../dto/updatedGoalsDTO';

export default class MatchesServices {
  constructor(private matchesModel: typeof Matches, private teamsModel: typeof Teams) {}

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

  async updatedGoals(params: IMatchesGoals, id: number) {
    const [insertId] = await this.matchesModel.update(
      {
        homeTeamGoals: params.homeTeamGoals,
        awayTeamGoals: params.awayTeamGoals,
      },
      { where: { id } },
    );

    if (insertId === 0) throw new Exeption(400, 'Matches does not exist.');
    return insertId;
  }

  async getMatchesHome() {
    const response = await this.teamsModel.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } },
      ],
    });
    return MatchesServices.matchesTable(response as unknown as Teams[]);
  }

  private static matchesTable(teams: Teams[]) {
    const table = teams.map((team) => {
      const name = team.teamName;
      const matches = team.teamHome;
      const resultTeam = MatchesServices.calculatorTable(name, matches);
      return resultTeam;
    });

    const tabelClassific = table.sort((a, b) => {

    });

    return table;
  }

  public static calculatorTable(nameTeam: number, matches: Matches[]) {
    const table = {
      name: nameTeam,
      totalPoints: MatchesServices.calculatorPoints(matches),
      totalGames: MatchesServices.calculatorTotalGames(matches),
      totalVictories: MatchesServices.calculatorTotalVictories(matches),
      totalDraws: MatchesServices.calculatorDraws(matches),
      totalLosses: MatchesServices.calculatorLosses(matches),
      goalsFavor: MatchesServices.calculatorGoalsHome(matches),
      goalsOwn: MatchesServices.calculatorGoalsOwn(matches),
      goalsBalance: MatchesServices.calculatorGoalsBalance(matches),
      efficiency: MatchesServices.calculatorEffieciency(matches),
    };
    return table;
  }

  public static calculatorTotalGames(matches: Matches[]) {
    const totalGames = matches.length;
    return totalGames;
  }

  public static calculatorTotalVictories(matches: Matches[]) {
    const totalVictories = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const total = totalVictories.length;
    return total;
  }

  public static calculatorPoints(matches: Matches[]) {
    const victories = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const totalVictories = victories.length;
    const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalDraws = draws.length;
    const totalPoints = totalVictories * 3 + totalDraws;
    return totalPoints;
  }

  public static calculatorDraws(matches: Matches[]) {
    const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalDraws = draws.length;
    return totalDraws;
  }

  public static calculatorLosses(matches: Matches[]) {
    const losses = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const totalLosses = losses.length;
    return totalLosses;
  }

  public static calculatorGoalsHome(matches: Matches[]) {
    const goals = matches.map((match) => match.homeTeamGoals);
    const totalGoals = goals.reduce((prev, curr) => prev + curr);
    return totalGoals;
  }

  public static calculatorGoalsOwn(matches: Matches[]) {
    const goals = matches.map((match) => match.awayTeamGoals);
    const totalGoals = goals.reduce((curr, prev) => curr + prev);
    return totalGoals;
  }

  public static calculatorGoalsBalance(matches: Matches[]) {
    const goalsHome = matches.map((match) => match.homeTeamGoals);
    const totalGoalsHome = goalsHome.reduce((prev, curr) => prev + curr);
    const goalsOwn = matches.map((match) => match.awayTeamGoals);
    const totalGoalsOwn = goalsOwn.reduce((curr, prev) => curr + prev);
    return totalGoalsHome - totalGoalsOwn;
  }

  public static calculatorEffieciency(matches: Matches[]) {
    const totalGames = matches.length;
    const victories = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const losses = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totaLosses = losses.length;
    const totalVictories = victories.length;
    return Number((((totalVictories * 3 + totaLosses) / (totalGames * 3)) * 100).toFixed(2));
  }
}
