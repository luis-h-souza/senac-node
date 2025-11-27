const { verify } = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // extrai o token do cabeçalho
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  try {
    const verificado = verify(token, process.env.JWT_SECRET)
    req.usuarioId = verificado.id
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
