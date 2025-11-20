const express = require('express')
const router = express.Router()
const financeiroController = require('../controllers/financeiroController')

router.get('/', financeiroController.show)
router.get('/:id', financeiroController.showById)
router.post('/', financeiroController.create)
router.put('/:id', financeiroController.update)
router.delete('/:id', financeiroController.delete)

module.exports = router
