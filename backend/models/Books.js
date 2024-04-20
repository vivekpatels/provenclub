const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookId: Number,
    BookName: String,
    NumberOfCopies: Number
})

module.exports = mongoose.model('Book', bookSchema)