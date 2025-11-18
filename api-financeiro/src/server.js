require('dotenv').config()

const app = require('./index')
const { conexaoBanco } = require('./models')

const PORT = parseInt(`${process.env.PORT || 3000}`)
conexaoBanco.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
