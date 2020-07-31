const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professorSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    turmas: [{
        type: Schema.Types.ObjectId,
        ref: 'Turma'
    }]
})

module.exports = mongoose.model('Professor', professorSchema);