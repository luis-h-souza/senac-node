const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (conexaoBanco) => {
  const Usuario = conexaoBanco.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'O nome é obrigatório' },
        min: 3,
      }
    },
    email: {
      type: DataTypes.STRING, unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'O email ou senha são obrigatórios' },
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'O email ou senha são obrigatórios' },
      }
    },
  }, {
    tableName: 'usuario',
  })

  // criptografia da senha
  Usuario.beforeCreate(async (usuario) => {
    usuario.senha = await bcrypt.hash(usuario.senha, 10)
  })
  return Usuario
}
