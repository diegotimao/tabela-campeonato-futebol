import Table from '../dto/tableDTO';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export default class LeadBoardServices {
  constructor(private teamsModel: typeof Teams) {}

  async leadBoardHome() {
    const response = await this.teamsModel.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } },
      ],
    });
    return LeadBoardServices.matchesTable(response as unknown as Teams[]);
  }

  private static matchesTable(teams: Teams[]) {
    const table = teams.map((team) => {
      const name = team.teamName;
      const matches = team.teamHome;
      const resultTeam = LeadBoardServices.calculatorTableHome(name, matches);
      return resultTeam;
    });

    return LeadBoardServices.matcheTableCassific(table);
  }

  public static matcheTableCassific(table: Table[]) {
    const tableSort = table.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      return 0;
    });
    return tableSort;
  }

  public static calculatorTableHome(nameTeam: string, matches: Matches[]) {
    const table = {
      name: nameTeam,
      totalPoints: LeadBoardServices.calculatorPoints(matches),
      totalGames: LeadBoardServices.calculatorTotalGames(matches),
      totalVictories: LeadBoardServices.calculatorTotalVictories(matches),
      totalDraws: LeadBoardServices.calculatorDraws(matches),
      totalLosses: LeadBoardServices.calculatorLosses(matches),
      goalsFavor: LeadBoardServices.calculatorGoalsHome(matches),
      goalsOwn: LeadBoardServices.calculatorGoalsOwn(matches),
      goalsBalance: LeadBoardServices.calculatorGoalsBalance(matches),
      efficiency: LeadBoardServices.calculatorEffieciency(matches),
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
