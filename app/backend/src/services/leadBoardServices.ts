import Table from '../dto/tableDTO';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import LeadBoarAwayService from './leadBoardAwayService';
import LeadBoardHomeServices from './leadBoardHomeServices';

export default class LeadBoardServices {
  constructor(private teamsModel: typeof Teams) {}

  async leadBoardAll() {
    const response = await this.teamsModel.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } },
        { model: Matches, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    return LeadBoardServices.leadBoardTableHome(response);
  }

  private static leadBoardTableHome(teams: Teams[]) {
    const table = teams.map((team) => {
      const name = team.teamName;
      const drawsHome = team.teamHome;
      const drawsAway = team.teamAway;
      const resultTeam = LeadBoardServices.calculatorTableHome(name, drawsHome, drawsAway);
      return resultTeam;
    });

    return LeadBoardServices.tableCassific(table);
  }

  public static tableCassific(table: Table[]) {
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

  public static calculatorTableHome(
    nameTeam: string,
    matchesHome: Matches[],
    matchesAway: Matches[],
  ) {
    const table = {
      name: nameTeam,
      totalPoints: LeadBoardServices.calculatorPoints(matchesHome, matchesAway),
      totalGames: LeadBoardServices.calculatorGames(matchesHome, matchesAway),
      totalVictories: LeadBoardServices.calculatorVitories(matchesHome, matchesAway),
      totalDraws: LeadBoardServices.totalDraw(matchesHome, matchesAway),
      totalLosses: LeadBoardServices.totalLosses(matchesHome, matchesAway),
      goalsFavor: LeadBoardServices.goalsFavor(matchesHome, matchesAway),
      goalsOwn: LeadBoardServices.totalGoalsOwn(matchesHome, matchesAway),
      goalsBalance: LeadBoardServices.goalsBalance(matchesHome, matchesAway),
      efficiency: LeadBoardServices.calculatorEffieciency(matchesHome, matchesAway),
    };
    return table;
  }

  public static calculatorPoints(matchesHome: Matches[], matchesAway: Matches[]) {
    const responseAway = LeadBoarAwayService.calculatorPointsAway(matchesAway);
    const responseHome = LeadBoardHomeServices.calculatorPointsHome(matchesHome);
    return responseHome + responseAway;
  }

  public static calculatorGames(matchesHome: Matches[], matchesAway: Matches[]) {
    const totalDrawsHome = matchesHome.length;
    const totalDrawsAway = matchesAway.length;
    return totalDrawsHome + totalDrawsAway;
  }

  public static calculatorVitories(matchesHome: Matches[], matchesAway: Matches[]) {
    const vitoriesHome = LeadBoardHomeServices.calculatorTotalVictoriesHome(matchesHome);
    const vitoriesAway = LeadBoarAwayService.calculatorTotalVictoriesAway(matchesAway);
    return vitoriesHome + vitoriesAway;
  }

  public static totalDraw(matchesHome: Matches[], matchesAway: Matches[]) {
    const totalDrawHome = LeadBoardHomeServices.calculatorDraws(matchesHome);
    const totalDrawAway = LeadBoarAwayService.calculatorDraws(matchesAway);
    return totalDrawHome + totalDrawAway;
  }

  public static totalLosses(matchesHome: Matches[], matchesAway: Matches[]) {
    const totalLossesHome = LeadBoardHomeServices.calculatorLossesHome(matchesHome);
    const totalLossesAway = LeadBoarAwayService.calculatorLossesAway(matchesAway);
    return totalLossesHome + totalLossesAway;
  }

  public static goalsFavor(matchesHome: Matches[], matchesAway: Matches[]) {
    const goalsFavorHome = LeadBoardHomeServices.calculatorGoalsHome(matchesHome);
    const goalsFavorAway = LeadBoarAwayService.calculatorGoalsAway(matchesAway);
    return goalsFavorHome + goalsFavorAway;
  }

  public static totalGoalsOwn(matchesHome: Matches[], matchesAway: Matches[]) {
    const totalGoalsHome = LeadBoardHomeServices.calculatorGoalsOwn(matchesHome);
    const totalGoalsAway = LeadBoarAwayService.calculatorGoalsHome(matchesAway);
    return totalGoalsHome + totalGoalsAway;
  }

  public static goalsBalance(matchesHome: Matches[], matchesAway: Matches[]) {
    const balanceHome = LeadBoardHomeServices.calculatorGoalsBalanceHome(matchesHome);
    const balanceAway = LeadBoarAwayService.calculatorGoalsBalanceAway(matchesAway);
    return balanceHome + balanceAway;
  }

  public static calculatorEffieciency(matchesHome: Matches[], matchesAway: Matches[]) {
    const totalGames = matchesHome.length + matchesAway.length;
    const victoriesHome = matchesHome.filter(
      (match) => match.homeTeamGoals > match.awayTeamGoals,
    ).length;

    const lossesHome = matchesHome.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;

    const victoriesAway = matchesAway.filter(
      (match) => match.homeTeamGoals < match.awayTeamGoals,
    ).length;

    const lossesAway = matchesAway.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;

    const totalVitories = (victoriesHome + victoriesAway);
    const totalLosses = (lossesHome + lossesAway);

    return Number((((totalVitories * 3 + totalLosses) / (totalGames * 3)) * 100).toFixed(2));
  }
}
