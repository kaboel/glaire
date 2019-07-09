const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const Author = mongoose.model('Author', SCHEMA, 'Authors');

module.exports = Author;
