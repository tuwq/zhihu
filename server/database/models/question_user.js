const mongoose = require('mongoose');
const questionUser = require('../schema/question_user.js')
var QuestionUser = mongoose.model('QuestionUser', questionUser,'questionUser')

module.exports = QuestionUser