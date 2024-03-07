const EtudiantController = require('../controller/etudiant.controller')
const express = require('express')
const router = express.Router()

router.post('/',EtudiantController.create)
router.get('/',EtudiantController.getAll)
router.post('/target',EtudiantController.getone)
router.post('/update',EtudiantController.update)
router.post('/delete',EtudiantController.del)

module.exports = router

