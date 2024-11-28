const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false // Mặc định là false nếu không cung cấp
    }
});

module.exports = mongoose.model('Todo', todoSchema);
