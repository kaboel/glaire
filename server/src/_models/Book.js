const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  authorId: {
    type: String,
    required: true
  },
  publisherId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    required: true
  }
});

const Book = mongoose.model('Book', SCHEMA, 'Books');

module.exports = Book;
