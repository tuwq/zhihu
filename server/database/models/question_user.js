const mongoose = require('mongoose');
const question_user = require('../schema/question_user.js')
var Question_user = mongoose.model('Question_user', question_user,'question_user')

module.exports = Question_user