const { Categoria } = require('../models')

exports.show = async (req, res) => {
  try {
    const data = await Categoria.findAll()
    res.json(data)
  } catch (error) {
    res.status(404).json({ error: 'Erro ao buscar registros.', datails: error.message })
  }
}

exports.create = async (req, res) => {
  const { nome, descricao } = req.body

  try {
    const categoria = await Categoria.create(req.body)
    res.status(201).json(categoria)
  } catch (listaDeErros) {

    // capturo o erro vindo do model através do validate
    if (listaDeErros.name === 'SequelizeValidationError') {
      return res.status(400).json({
        inconsistencias: listaDeErros.errors.map(e => e.message)
      })
    }
    // use the caught variable's message (listaDeErros) instead of undefined `error`
    res.status(500).json({ error: 'Erro ao criar o registro.', details: listaDeErros.message })
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    const registro = await Categoria.destroy({ where: { id } })
    res.status(204).json(registro)

  } catch (error) {
    res.status(500).json({ error: 'Erro ao exluir o registro.', details: error.message })
  }
}
