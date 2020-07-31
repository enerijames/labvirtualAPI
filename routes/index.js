const express = require('express');
const { body } = require('express-validator/check')

const Aluno = require('../models/aluno');

const isAuth = require('../middleware/is-auth');
const indexController = require('../controllers/index');

const router = express.Router();

// GET /feed/posts
router.get('/loadHome', isAuth, indexController.loadHome);

router.post('/criarTarefa', indexController.criarTarefa);

router.put('/editConta', isAuth, indexController.editConta);

router.get('/getAluno', isAuth, indexController.getAluno);

module.exports = router;