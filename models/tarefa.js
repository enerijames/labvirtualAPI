const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tarefaSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Tarefa', tarefaSchema);