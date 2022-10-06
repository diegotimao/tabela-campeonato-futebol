import { Model, BOOLEAN, INTEGER } from 'sequelize';
import db from '.';

class Matches extends Model {
  id?: number;
  homeTeam: number;
  homeTeamGols: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  createdAt: Date;
  updatedAt: Date;
}

Matches.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGols: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

export default Matches;
