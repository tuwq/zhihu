const mongoose = require('mongoose');
const dynamicsSchema = require('../schema/dynamics.js')
var Dynamics = mongoose.model('Dynamics', dynamicsSchema)

module.exports = Dynamics