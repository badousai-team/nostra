module.exports = {
  up: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    }),
  down: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.sequelize.query('DROP EXTENSION "uuid-ossp";')
      await queryInterface.sequelize.query('DROP EXTENSION pgcrypto;')
    }),
}
