import * as dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

function getEnv(key: string, required = true): string {
  const val = process.env[key];
  if (required && (!val || val.trim() === "")) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
  }
  return val ?? "";
}

const DB_NAME = getEnv("DB_NAME");
const DB_USER = getEnv("DB_USER");
const DB_PASSWORD = getEnv("DB_PASSWORD");
const DB_HOST = getEnv("DB_HOST");

const DB_PORT = (() => {
  const p = process.env.DB_PORT;
  if (p && /^\d+$/.test(p)) return parseInt(p, 10);
  return 5432;
})();

export const conexaoBanco = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

export async function testConnection(): Promise<void> {
  try {
    await conexaoBanco.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  } catch (err) {
    console.error("Não foi possível conectar ao banco de dados:", err);
    throw err;
  }
}

export default conexaoBanco;
