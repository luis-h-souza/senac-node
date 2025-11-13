const { Sequelize } = require('sequelize')
const sequelize = require('../config/database')
const Financeiro = require('./financeiro')(sequelize)

module.exports = { sequelize, Financeiro }
