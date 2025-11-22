import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from "sequelize";

export class Financeiro extends Model<
  InferAttributes<Financeiro>,
  InferCreationAttributes<Financeiro>
> {
  declare id: number;
  declare data: Date;
  declare descricao: String;
  declare formPagamento: String;
  declare valor: Number;
  declare tipo: String;
}

export default (sequelize: Sequelize) => {
  Financeiro.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      data: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "A data é obrigatória" },
          isDate: true,
          isValidDateFormat(value: any) {
            if (isNaN(Date.parse(value))) {
              throw new Error("A data deve estar no formato yyyy-mm-dd");
            }
          },
        },
      },

      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "A data é obrigatória" },
          min: 5,
          max: 20,
        },
      },

      formPagamento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "A data é obrigatória" },
          isIn: {
            args: [
              ["pix", "dinheiro", "crédito", "débito", "boleto", "cheque"],
            ],
            msg: "Forma de pagamento inválido",
          },
        },
      },

      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "A descrição é obrigatória" },
          isFloat: { msg: "O valor deve ser numérico" },
          min: { args: [0.01], msg: "O valor deve ser maior que zero" },
        },
      },

      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "A descrição é obrigatória" },
          isIn: {
            args: [["entrada", "saida"]],
            msg: 'O tipo deve ser "entrada" ou "saida"',
          },
        },
      },
    },
    {
      sequelize,
      tableName: "financeiro",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Financeiro;
};
