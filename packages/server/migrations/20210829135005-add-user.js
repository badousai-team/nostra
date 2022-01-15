const { Sequelize } = require('sequelize')

module.exports = {
  up: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.createTable('User', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
          primaryKey: true,
        },
        index: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
        },
        address: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        username: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        email: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        status: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: 'active',
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: true,
        },
      })
      await  queryInterface.addIndex('User', {
        name: 'user_address_idx',
        fields: ['address'],
        type: 'UNIQUE',
      })
    }),

  down: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.dropTable('User')
    }),
}
