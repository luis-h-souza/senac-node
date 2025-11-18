const conexaoBanco = require('../config/database')
const Financeiro = require('./financeiro')(conexaoBanco)

module.exports = { conexaoBanco, Financeiro }
