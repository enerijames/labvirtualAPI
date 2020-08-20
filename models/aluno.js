const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alunoSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    matricula:{
        type: String,
        required: true,
    },
    curso:{
        type: String,
        required: true,
    },
    semestre:{
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    notifications: {
        type: Array,
        required: false,
    },
    tarefas: [{
        type: Schema.Types.ObjectId,
        ref: 'Tarefa'
    }],
    codigoTurma: {
        type: String,
        required: false,
    },
    idade: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Aluno', alunoSchema);