const { where } = require('sequelize')
const { Financeiro } = require('../models')

// listar pelo ID -> GET
exports.showById = async (req, res) => {
  const { id } = req.params
  const data = await Financeiro.findByPk(id)
  if (data === null) {
    res.status(404).json({ error: 'Erro ao buscar registros.', details: error.message })
  } else {
    res.status(200).json(data)
  }
}

// listar -> GET
exports.show = async (req, res) => {
  try {
    const data = await Financeiro.findAll()
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ error: 'Erro ao buscar registros.', details: error.message })
  }
}

// criar -> POST
exports.create = async (req, res) => {

  try {
    const registro = await Financeiro.create(req.body)
    res.status(201).json(registro)
  } catch (listaDeErros) {

    // capturo o erro vindo do model através do validate
    if (listaDeErros.name === 'SequelizeValidationError') {
      return res.status(400).json({
        inconsistencias: listaDeErros.errors.map(e => e.message)
      })
    }
    res.status(500).json({ error: 'Erro ao criar o registro.', details: error.message })
  }
}

// atualizar -> PUT
exports.update = async (req, res) => {
  const { id } = req.params
  const registroAtualizado = req.body

  try {
    // const [ atualizado ] = await Financeiro.update(req.body, { where: { id } })

    // if (atualizado) {
    //   res.status(200).json({ secesso: "Registro atualizado com sucesso" })
    // } else {
    //   res.status(404).json({ secesso: "Registro não encontrado" })
    // }

    const registro = await Financeiro.update(registroAtualizado, { where: { id } })
    res.status(200).json(registroAtualizado)

  } catch (listaDeErros) {

    if (listaDeErros.name === 'SequelizeValidationError') {
      return res.status(400).json({
        inconsistencias: listaDeErros.errors.map(e => e.message)
      })
    }
    res.status(500).json({ error: 'Erro ao criar o registro.', details: error.message })
  }
}

// deletar -> DELETE
exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    const registro = await Financeiro.destroy({ where: { id } })
    res.status(204).json(registro)

  } catch (error) {
    res.status(500).json({ error: 'Erro ao exluir o registro.', details: error.message })
  }
}
