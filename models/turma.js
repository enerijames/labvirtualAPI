const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const turmaSchema = new Schema({
    alunos: [{
        type: Schema.Types.ObjectId,
        ref: 'Aluno'
    }],
    semestre: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Turma', turmaSchema);