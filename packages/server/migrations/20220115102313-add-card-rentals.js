const { Sequelize } = require('sequelize')

module.exports = {
  up: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.createTable('Card', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
          primaryKey: true,
        },
        event_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        contract_address: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        token_id: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        image_url: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        creator: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        label: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
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
      await queryInterface.createTable('Rental', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        event_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        card_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        rent_price: {
          type: Sequelize.DECIMAL,
          defaultValue: 0,
          allowNull: false,
        },
        deposit: {
          type: Sequelize.DECIMAL,
          defaultValue: 0,
          allowNull: false,
        },
        start_time: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_time: {
          type: Sequelize.DATE,
          allowNull: false,
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
    }),
  down: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.dropTable('Card')
      await queryInterface.dropTable('Rental')
    }),
}
