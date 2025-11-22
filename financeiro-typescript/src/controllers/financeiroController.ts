import { Financeiro } from "../models";
import { Request, Response } from "express";

// listar pelo ID -> GET
export const showById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await Financeiro.findByPk(id);

    if (!data) {
      res.status(404).json({ message: "Erro ao buscar registro" });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro interno de servidor.", error });
  }
};

// listar -> GET
export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    void req;
    const data = await Financeiro.findAll();
    res.json(data);
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    res.status(404).json({ message: "Erro ao buscar registro", details });
  }
};

// criar -> POST
export const create = async (req: Request, res: Response) => {
  try {
    const registro = await Financeiro.create(req.body);
    res.status(201).json(registro);
    return;
  } catch (error) {
    // erros de validação do Sequelize verificando o nome do erro e, em seguida, convertendo para qualquer tipo
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      (error as any).name === "SequelizeValidationError"
    ) {
      const validationError = error as any;
      return res.status(400).json({
        inconsistencias: validationError.errors.map((e: any) => e.message),
      });
    }
    const details = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: "Erro ao criar o registro.", details });
    return;
  }
};

// atualizar -> PUT
export const update = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    const [atualizado] = await Financeiro.update(req.body, { where: { id } });

    if (atualizado) {
      res.status(200).json({ sucesso: "Registro atualizado com sucesso" });
      return;
    } else {
      res.status(404).json({ sucesso: "Registro não encontrado" });
      return;
    }
  } catch (error) {
    // erros de validação do Sequelize verificando o nome do erro e, em seguida, convertendo para qualquer tipo
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      (error as any).name === "SequelizeValidationError"
    ) {
      const validationError = error as any;
      return res.status(400).json({
        inconsistencias: validationError.errors.map((e: any) => e.message),
      });
    }
    const details = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: "Erro ao criar o registro.", details });
    return;
  }
};

// deletar -> DELETE
export const deletar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const registro = await Financeiro.destroy({ where: { id } });
    res.status(204).json(registro);
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: "Erro ao criar o registro.", details });
    return;
  }
};
