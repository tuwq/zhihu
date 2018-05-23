const mongoose = require('mongoose');
const dynamicSchema = require('../schema/dynamic.js')
var Dynamic = mongoose.model('Dynamic', dynamicSchema)

module.exports = Dynamic