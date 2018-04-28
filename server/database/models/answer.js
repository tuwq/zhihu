const mongoose = require('mongoose');
const answerSchema = require('../schema/answer.js')
var Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer