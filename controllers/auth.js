const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 
const Aluno = require('../models/aluno')
const Professor = require('../models/professor')

exports.signup =(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const matricula = req.body.matricula
    const curso = req.body.curso
    const semestre = req.body.semestre
    bcrypt.hash(password, 12)
    .then(hashedPw => {
        const user = new Aluno({
            username: username,
            email: email,
            password: hashedPw,
            matricula: matricula,
            curso: curso,
            semestre: semestre,
        });
        return user.save()
    })
    .then(result => {
        res.status(201).json({message: 'Aluno Created!', userId: result._id})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.signupProf = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    bcrypt.hash(password, 12)
    .then(hashedPw => {
        const user = new Professor({
            username: username,
            email: email,
            password: hashedPw,
        });
        return user.save()
    })
    .then(result => {
        res.status(201).json({message: 'Professor Created!', userId: result._id})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;

    Aluno.findOne({email:email})
    .then(user => {
        if(!user) {
            const error = new Error('Nenhum aluno com essas credencias encontrado');
            error.statusCode = 401;
            throw error
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            const error = new Error('Nenhum aluno com essas credencias encontrado');
            error.statusCode = 401;
            throw error
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString(),
        }, 'somesupersecretsecret', { expiresIn: '1h' });
        res.status(200).json({token: token, userId: loadedUser._id.toString()})
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}