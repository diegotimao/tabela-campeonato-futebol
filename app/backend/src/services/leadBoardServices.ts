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

    return table;
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
      goalsOwn: LeadBoardServices.totalGoals(matchesHome, matchesAway),
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

  public static totalGoals(matchesHome: Matches[], matchesAway: Matches[]) {
    const totalGoalsHome = LeadBoardHomeServices.calculatorGoalsHome(matchesHome);
    const totalGoalsAway = LeadBoarAwayService.calculatorGoalsOwn(matchesAway);
    return totalGoalsHome + totalGoalsAway;
  }
}
