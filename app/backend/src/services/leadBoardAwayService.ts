import Table from '../dto/tableDTO';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export default class LeadBoarAwayService {
  constructor(private teamsModel: typeof Teams) {}

  async leadBoardAway() {
    const response = await this.teamsModel.findAll({
      include: [
        { model: Matches, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    return LeadBoarAwayService.leadBoardTableAway(response);
  }

  private static leadBoardTableAway(teams: Teams[]) {
    const table = teams.map((team) => {
      const name = team.teamName;
      const draws = team.teamAway;
      const resultTeam = LeadBoarAwayService.calculatorTableAway(name, draws);
      return resultTeam;
    });

    return LeadBoarAwayService.matcheTableCassific(table);
  }

  public static calculatorTableAway(nameTeam: string, matches: Matches[]) {
    const table = {
      name: nameTeam,
      totalPoints: LeadBoarAwayService.calculatorPointsAway(matches),
      totalGames: LeadBoarAwayService.calculatorTotalGames(matches),
      totalVictories: LeadBoarAwayService.calculatorTotalVictoriesAway(matches),
      totalDraws: LeadBoarAwayService.calculatorDraws(matches),
      totalLosses: LeadBoarAwayService.calculatorLossesAway(matches),
      goalsFavor: LeadBoarAwayService.calculatorGoalsAway(matches),
      goalsOwn: LeadBoarAwayService.calculatorGoalsHome(matches),
      goalsBalance: LeadBoarAwayService.calculatorGoalsBalanceAway(matches),
      efficiency: LeadBoarAwayService.calculatorEffieciencyAway(matches),
    };
    return table;
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

  public static calculatorTotalGames(matches: Matches[]) {
    const totalGames = matches.length;
    return totalGames;
  }

  public static calculatorDraws(matches: Matches[]) {
    const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalDraws = draws.length;
    return totalDraws;
  }

  public static calculatorTotalVictoriesAway(matches: Matches[]) {
    const totalVictories = matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
    const total = totalVictories.length;
    return total;
  }

  public static calculatorPointsAway(matches: Matches[]) {
    const victories = matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
    const totalVictories = victories.length;
    const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalDraws = draws.length;
    const totalPoints = totalVictories * 3 + totalDraws;
    return totalPoints;
  }

  public static calculatorLossesAway(matches: Matches[]) {
    const losses = matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals);
    const totalLosses = losses.length;
    return totalLosses;
  }

  public static calculatorGoalsHome(matches: Matches[]) {
    const goals = matches.map((match) => match.homeTeamGoals);
    const totalGoals = goals.reduce((prev, curr) => prev + curr);
    return totalGoals;
  }

  public static calculatorGoalsAway(matches: Matches[]) {
    const goals = matches.map((match) => match.awayTeamGoals);
    const totalGoals = goals.reduce((curr, prev) => curr + prev);
    return totalGoals;
  }

  public static calculatorGoalsBalanceAway(matches: Matches[]) {
    const goalsHome = matches.map((match) => match.homeTeamGoals);
    const totalGoalsHome = goalsHome.reduce((prev, curr) => prev + curr);
    const goalsOwn = matches.map((match) => match.awayTeamGoals);
    const totalGoalsOwn = goalsOwn.reduce((curr, prev) => curr + prev);
    return totalGoalsOwn - totalGoalsHome;
  }

  public static calculatorEffieciencyAway(matches: Matches[]) {
    const totalGames = matches.length;
    const victories = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const losses = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totaLosses = losses.length;
    const totalVictories = victories.length;
    return Number((((totalVictories * 3 + totaLosses) / (totalGames * 3)) * 100).toFixed(2));
  }
}
