const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Publisher = mongoose.model('Publisher', SCHEMA, 'Publishers');

module.exports = Publisher;
