const { Sequelize } = require('sequelize')

module.exports = {
  up: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.addColumn('User', 'profile_url', {
        type: Sequelize.TEXT,
        allowNull: true,
      })
    }),
  down: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.removeColumn('User', 'profile_url')
    }),
}
