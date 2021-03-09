const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ResourceSchema = new Schema({
  url: String,
  revision_id: String,
  description: String,
  format: String,
  hash: String,
  name: String,
  resource_type: String,
  mimetype: String,
  mimetype_inner: String,
  webstore_url: String,
  cache_url: String,
  size: Number,
  created: Date,
  last_modified: Date,
  cache_last_updated: Date,
  webstore_last_updated: Date
})

module.exports = mongoose.model('Resource', ResourceSchema)
