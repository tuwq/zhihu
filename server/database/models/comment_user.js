const mongoose = require('mongoose');
const commentUser = require('../schema/comment_user.js')
var CommentUser = mongoose.model('CommentUser', commentUser,'commentUser')

module.exports = CommentUser