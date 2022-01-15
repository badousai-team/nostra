const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class User extends Model {
  display() {
    const { deletedAt, index, ...user } = this.get({ plain: true })
    return user
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  index: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  profileUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  sequelize: db,
  paranoid: true,
  tableName: 'User',
})

module.exports = User
