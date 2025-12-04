const express = require('express')
const router = express.Router()

const categoriaController = require('../controllers/categoriaController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/', categoriaController.show)
router.post('/', categoriaController.create)
router.put('/:id', categoriaController.update)
router.delete('/:id', categoriaController.delete)

module.exports = router
