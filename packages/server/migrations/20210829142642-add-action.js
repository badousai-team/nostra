const { Sequelize } = require('sequelize')

module.exports = {
  up: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.createTable('Action', {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        action: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        object: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        object_id: {
          // object id received value in UUID and BIGINT
          type: Sequelize.TEXT,
          allowNull: false,
        },
        subject: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        subject_id: {
          // object id received value in UUID and BIGINT
          type: Sequelize.TEXT,
          allowNull: false,
        },
        value: {
          type: Sequelize.JSONB,
          allowNull: false,
          defaultValue: '{}',
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
      })
      await queryInterface.addIndex('Action', {
        fields: ['object', 'object_id'],
      })
      await queryInterface.addIndex('Action', {
        fields: ['subject', 'subject_id'],
      })
    }),

  down: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.dropTable('Action')
    }),
}
