const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class Card extends Model {
  display() {
    return this.get({ plain: true })
  }
}

Card.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  contractAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  tokenId: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  creator: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  label: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
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
  tableName: 'Card',
})

module.exports = Card
