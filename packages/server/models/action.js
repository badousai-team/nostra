const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class Action extends Model {
  display() {
    return this.get({ plain: true })
  }
}

Action.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  action: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  object: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  objectId: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  subject: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  subjectId: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  value: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
}, {
  sequelize: db,
  tableName: 'Action',
})

module.exports = Action
