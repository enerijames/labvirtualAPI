const { validationResult } = require('express-validator/check')

const Aluno = require('../models/aluno');


exports.loadHome = (req, res, next) => {
    alunoId = req.userId;

    Aluno.findById(alunoId)
    .then(aluno => {
        res.status(200).json({
            aluno: aluno
        })
    })
    .catch(err => {
        const error = new Error
        error.statusCode = 404;
        throw error
    })
}

exports.criarTarefa = (req, res, next) => {
    alunoId = req.userId;

    console.log(req.body)
}

exports.editConta = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const idade = req.body.idade;

    alunoId = req.userId;

    console.log(alunoId);

    Aluno.findById(alunoId)
    .then(aluno => {
        if(!aluno) {
            const error = new Error('Usuário não encontrado')
            error.statusCode = 404;
            throw error
        }
        aluno.name = name;
        aluno.username = username;
        aluno.email = email
        aluno.idade = idade;
        return aluno.save();
    })
    .then(result => {
        res.status(200).json({message: 'Aluno Editado', aluno: result})
    })
    .catch(err => {
        err = new Error
        err.statusCode = 500;
        next (err);
    })
}

exports.getAluno = (req,res, next) => {
    alunoId = req.userId

    Aluno.findById(alunoId)
    .then(aluno => {
        if(!aluno) {
            const error = new Error('Usuário não encontrado')
            error.statusCode = 404;
            throw error
        }
        return res.status(200).json({aluno:aluno})
    })
}