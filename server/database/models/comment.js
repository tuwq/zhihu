const mongoose = require('mongoose');
const commentSchema = require('../schema/comment.js')
var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment