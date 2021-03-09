const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InstanceSchema = new Schema({
  name: String,
  url: String,
  packagesCount: Number,
  updatedDate: Date
})

module.exports = mongoose.model('Instance', InstanceSchema)
