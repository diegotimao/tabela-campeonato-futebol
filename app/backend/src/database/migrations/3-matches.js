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
        field: 'home_team_gols'
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team'
      },
      awayGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'away_goals'
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('matches');
  }
}