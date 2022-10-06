import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Matches from './matches';

class Teams extends Model {
  id?: number;
  teamName: number;
}

Teams.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

// Teams.hasMany( Matches, { foreignKey: 'home_team', as: 'teamHome' });
// Teams.hasMany( Matches, { foreignKey: 'home_team', as: 'teamHome' });

export default Teams;
