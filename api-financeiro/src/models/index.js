const conexaoBanco = require('../config/database')
const Categoria = require('./categoria')(conexaoBanco)
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

// um registro financeiro pode ter muitas categorias
Categoria.hasMany(Financeiro, {
  foreignKey: 'categoriaId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// uma categoria pertence a um registro financeiro
Financeiro.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = { conexaoBanco, Financeiro, Usuario, Categoria }
