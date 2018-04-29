const mongoose = require('mongoose');
const answerUser = require('../schema/answer_user.js')
var AnswerUser = mongoose.model('AnswerUser', answerUser,'answerUser')

module.exports = AnswerUser