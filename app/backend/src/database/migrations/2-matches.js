module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('matches',  {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'home_team'
      },
      homeTeamGols: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals' 
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals'
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress'
      }
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('matches');
  }
}