const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class Event extends Model {
  display() {
    return this.get({ plain: true })
  }
}

Event.init({
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
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  rentPrice: {
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
  tableName: 'Event',
})

module.exports = Event
