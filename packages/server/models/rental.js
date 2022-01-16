const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class Rental extends Model {
  display() {
    return this.get({ plain: true })
  }
}

Rental.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  cardId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rentPrice: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: false,
  },
  deposit: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
}, {
  sequelize: db,
  tableName: 'Rental',
})

module.exports = Rental
