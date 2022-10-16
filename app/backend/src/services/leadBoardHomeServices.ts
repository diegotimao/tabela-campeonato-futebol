import Table from '../dto/tableDTO';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export default class LeadBoardHomeServices {
  constructor(private teamsModel: typeof Teams) {}

  async leadBoardHome() {
    const response = await this.teamsModel.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } },
      ],
    });
    return LeadBoardHomeServices.leadBoardTableHome(response as unknown as Teams[]);
  }

  private static leadBoardTableHome(teams: Teams[]) {
    const table = teams.map((team) => {
      const name = team.teamName;
      const draws = team.teamHome;
      const resultTeam = LeadBoardHomeServices.calculatorTableHome(name, draws);
      return resultTeam;
    });

    return LeadBoardHomeServices.matcheTableCassific(table);
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

  // refazer
  public static calculatorTableHome(nameTeam: string, matches: Matches[]) {
    const table = {
      name: nameTeam,
      totalPoints: LeadBoardHomeServices.calculatorPointsHome(matches),
      totalGames: LeadBoardHomeServices.calculatorTotalGames(matches),
      totalVictories: LeadBoardHomeServices.calculatorTotalVictoriesHome(matches),
      totalDraws: LeadBoardHomeServices.calculatorDraws(matches),
      totalLosses: LeadBoardHomeServices.calculatorLossesHome(matches),
      goalsFavor: LeadBoardHomeServices.calculatorGoalsHome(matches),
      goalsOwn: LeadBoardHomeServices.calculatorGoalsOwn(matches),
      goalsBalance: LeadBoardHomeServices.calculatorGoalsBalanceHome(matches),
      efficiency: LeadBoardHomeServices.calculatorEffieciencyHome(matches),
    };
    return table;
  }

  // Não refazer
  public static calculatorTotalGames(matches: Matches[]) {
    const totalGames = matches.length;
    return totalGames;
  }

  // home
  public static calculatorTotalVictoriesHome(matches: Matches[]) {
    const totalVictories = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const total = totalVictories.length;
    return total;
  }

  // home
  public static calculatorPointsHome(matches: Matches[]) {
    const victories = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const totalVictories = victories.length;
    const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalDraws = draws.length;
    const totalPoints = totalVictories * 3 + totalDraws;
    return totalPoints;
  }

  public static calculatorGoalsOwn(matches: Matches[]) {
    const goals = matches.map((match) => match.awayTeamGoals);
    const totalGoals = goals.reduce((curr, prev) => curr + prev);
    return totalGoals;
  }

  // não precisa
  public static calculatorDraws(matches: Matches[]) {
    const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalDraws = draws.length;
    return totalDraws;
  }

  // refazer
  public static calculatorLossesHome(matches: Matches[]) {
    const losses = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const totalLosses = losses.length;
    return totalLosses;
  }

  // não refazer
  public static calculatorGoalsHome(matches: Matches[]) {
    const goals = matches.map((match) => match.homeTeamGoals);
    const totalGoals = goals.reduce((prev, curr) => prev + curr);
    return totalGoals;
  }

  // não refazer
  public static calculatorGoalsBalanceHome(matches: Matches[]) {
    const goalsHome = matches.map((match) => match.homeTeamGoals);
    const totalGoalsHome = goalsHome.reduce((prev, curr) => prev + curr);
    const goalsOwn = matches.map((match) => match.awayTeamGoals);
    const totalGoalsOwn = goalsOwn.reduce((curr, prev) => curr + prev);
    return totalGoalsHome - totalGoalsOwn;
  }

  public static calculatorEffieciencyHome(matches: Matches[]) {
    const totalGames = matches.length;
    const victories = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const losses = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totaLosses = losses.length;
    const totalVictories = victories.length;
    return Number((((totalVictories * 3 + totaLosses) / (totalGames * 3)) * 100).toFixed(2));
  }
}
