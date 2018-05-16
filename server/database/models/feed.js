const mongoose = require('mongoose');
const feedSchema = require('../schema/feed.js')
var Feed = mongoose.model('Feed', feedSchema)

module.exports = Feed