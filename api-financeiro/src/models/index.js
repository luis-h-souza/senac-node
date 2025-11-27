const conexaoBanco = require('../config/database')
const Financeiro = require('./financeiro')(conexaoBanco)
const Usuario = require('./usuario')(conexaoBanco)

// usuario pode ter muitos registros finaceiros (hasMAny)
Usuario.hasMany(Financeiro, {
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// financeiro pertence a um usuario (belogsTo)
Financeiro.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = { conexaoBanco, Financeiro, Usuario }
