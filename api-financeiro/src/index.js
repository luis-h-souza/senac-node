require('dotenv').config()

const express = require('express')
const financeiroRouter = require('./router/financeiroRouter')
const authRouter = require('./router/authRouter')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// chama o roteador apropriado à ele
app.use('/v1/financeiro', financeiroRouter)
app.use('/v1/auth', authRouter)

module.exports = app
