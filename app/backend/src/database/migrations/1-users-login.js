module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rule: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};