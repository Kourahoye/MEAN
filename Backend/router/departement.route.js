const DeptController = require('../controller/departement.controller')
const express = require('express')
const router = express.Router()

router.post('/',DeptController.create)
router.get('/',DeptController.getAll)
router.post('/target',DeptController.getone)
router.post('/update',DeptController.update)
router.post('/delete',DeptController.del)

module.exports = router

