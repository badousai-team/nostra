const { Sequelize, QueryTypes, Op } = require('sequelize')
const Config = require('../config')

process.env.TZ = 'UTC+8'

const config = {
  ...Config.dbConfig,
  logging: Config.env.PRODUCTION ? false : console.log,
  omitNull: true,
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  dialectOptions: {
    collate: 'utf8_general_ci',
  },
  define: {
    // this underscored will allow auto transform underscore name to camelCase
    // so updatedAt will become updated_at
    underscored: true,

    // this freezeTableName allow us to ignore plural names
    // and have consistent model name and database name
    // database table name: Product model name: Product
    freezeTableName: true,

    // Set utf8 as default collation
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
      ssl: true,
    },
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
}

module.exports.db = config.use_env_variable ?
  new Sequelize(process.env[config.use_env_variable], config) :
  new Sequelize(config.database, config.username, config.password, config)

module.exports.Op = Op
module.exports.QueryTypes = QueryTypes
