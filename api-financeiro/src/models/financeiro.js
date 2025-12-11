const { DataTypes } = require('sequelize');
const categoria = require('./categoria');

module.exports = (conexaoBanco) => {
  const Financeiro = conexaoBanco.define('Financeiro', {
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        // is: {
        //   args: [/^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$/], // Regex para formato yyyy-mm-dd
        //   msg: "A data deve estar no formato yyyy-mm-dd válido."
        // },
        notNull: { msg: 'A data é obrigatória' },
        isDate: { msg: 'A data deve estar no formato yyy-mm-dd' }
      }
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: { msg: 'A descrição é obrigatória' },
          notEmpty: { msg: 'A descrição não pode estar vazia' },
          len: { args: [5, 255], msg: 'A descrição deve ter entre 5 e 255 caracteres' },
      }
    },
    formaPagamento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'A descrição é obrigatória' },
        isIn: {
          args: [['pix', 'dinheiro', 'credito', 'debito']],
          msg: 'Forma de pagamento inválido',
        }
      }
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'A descrição é obrigatória' },
        isFloat: { msg: 'O valor deve ser numérico' },
        min: { args: [0.01], msg: 'O valor deve ser maior que zero' },
      }
    },
    tipo: {
      type: DataTypes.ENUM('entrada', 'saida'),
      allowNull: false,
      validate: {
        notNull: { msg: 'A descrição é obrigatória' },
        isIn: {
          args: [['entrada', 'saida']],
          msg: 'O tipo deve ser "entrada" ou "saida"',
        }
      },
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria',
        key: 'id'
      }
    },
  }, {
    tableName: 'financeiro',  // força o nome da tabela @@map
    freezeTableName: true,  // impede a pluralização
  })
  return Financeiro;
}
