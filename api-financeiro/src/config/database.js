const { Sequelize } = require('sequelize')
require('dotenv').config()

const conexaoBanco = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.eventNames.DB_HOST,
    dialect: 'postgres',
    logging: false
})

module.exports = conexaoBanco;
