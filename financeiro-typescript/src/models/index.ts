import conexaoBanco from "../config/database";

// Importa a factory do model
import FinanceiroFactory, { Financeiro } from "./financeiro";

// Inicializa o model passando a conexão
const FinanceiroModel = FinanceiroFactory(conexaoBanco);

export {
  conexaoBanco,
  FinanceiroModel,
  Financeiro, // classe para tipos
};
