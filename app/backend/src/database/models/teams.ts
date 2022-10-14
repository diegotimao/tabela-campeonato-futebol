import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Matches from './matches';

class Teams extends Model {
  id?: number;
  teamName: string;
  teamHome: Matches[];
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
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' }); // muitos

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' }); // pra um
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Teams;
