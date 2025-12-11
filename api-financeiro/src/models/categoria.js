const { DataTypes } = require('sequelize')

module.exports = (conexaoBanco) => {
  const Categoria = conexaoBanco.define('Categoria', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'O nome é obrigatório' },
        notEmpty: { msg: 'O nome não pode ser vazio' },
        len: { args: [3, 255], msg: 'O nome deve ter pelo menos 3 caracteres' }
      }
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'A descrição é obrigatória' },
        notEmpty: { msg: 'A descrição não pode ser vazia' },
        len: { args: [3, 255], msg: 'A descrição deve ter entre 3 e 255 caracteres' },
      }
    },
  }, {
    tableName: 'categoria',
    freezeTableName: true,
    timestamps: false,
  })
  return Categoria;
}
