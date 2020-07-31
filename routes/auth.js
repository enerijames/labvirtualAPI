const express = require('express');
const { body } = require('express-validator/check')

const Aluno = require('../models/aluno')
const Professor = require('../models/professor')

const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup',
 [
     body('username').trim().not().isEmpty(),
     body('email')
     .isEmail()
     .withMessage('Please enter a valid email.')
     .custom((value, {req}) => {
         return Aluno.findOne({email: value}).then(userDoc => {
             if (userDoc) {
                 return Promise.reject('Email já utilizado')
             }
         })
     })
     .normalizeEmail(),
     body('password').trim().isLength({min: 5}),
     body('matricula')
     .trim()
     .not()
     .isEmpty()
     .custom((value, {req}) => {
         return Aluno.findOne({matricula: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('Matricula já cadastrada')
            }
         })
     })

 ], authController.signup);

 router.put('/signupProf', [
    body('username').trim().not().isEmpty(),
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        return Professor.findOne({email: value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email já utilizado')
            }
        })
    })
    .normalizeEmail(),
    body('password').trim().isLength({min: 5}),
 ], authController.signupProf);


 router.post('/login', authController.login)

module.exports = router;