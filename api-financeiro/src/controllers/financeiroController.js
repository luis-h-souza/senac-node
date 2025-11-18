const { Financeiro } = require('../models')

// listar pelo ID -> GET
exports.showById = async (req, res) => {
  const { id } = req.params
  const data = await Financeiro.findByPk(id)
  if (data === null) {
    console.log('Not found!');
    res.status(404).json({ error: 'Erro ao buscar registros.' })
  } else {
    console.log(data instanceof Financeiro);
    res.status(200).json(data)
  }
}

// listar -> GET
exports.show = async (req, res) => {
  try {
    const data = await Financeiro.findAll()
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ error: 'Erro ao buscar registros.' })
  }
}

// criar -> POST
exports.create = async (req, res) => {
  // validações
  const { data, descricao, formaPagamento, valor, tipo } = req.body

  if (data == "" || descricao == "" || formaPagamento == "" || valor == "" || tipo == "") {
    throw new Error("Todos os campos devem ser prenchidos.");
  }

  try {
    console.log(req.body)
    const registro = await Financeiro.create(req.body)
    res.status(201).json(registro)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o registro.' })
  }
}
