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

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamName' });
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'matches_id' });

export default Teams;
