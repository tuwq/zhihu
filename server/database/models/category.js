const mongoose = require('mongoose');
const categorySchema = require('../schema/category.js')
var Category = mongoose.model('Category', categorySchema)


module.exports = Category