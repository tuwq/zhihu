const mongoose = require('mongoose');
const questionSchema = require('../schema/question.js')
var Question = mongoose.model('Question', questionSchema)

module.exports = Question