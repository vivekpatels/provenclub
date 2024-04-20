const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    MemberID: Number,
    MemberName: String,
})

module.exports = mongoose.model('Member', memberSchema)