export default interface IMatchesCreateDTO {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean;
}
