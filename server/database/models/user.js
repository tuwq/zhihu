const mongoose = require('mongoose');
const userSchema = require('../schema/user.js')
var User = mongoose.model('User', userSchema)


module.exports = User