const mongoose = require('mongoose');

const circulationSchema = new mongoose.Schema({
    book: {
        type: Number,
        ref: 'Book',
        required: true
    },
    eventType: {
        type: String,
    },
    member: {
        type: Number,
        ref: 'Member',
        required: true 
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },
    returnDate: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Circulation', circulationSchema)