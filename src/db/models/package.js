const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PackageSchema = new Schema({
  instanceId: String,
  license_title: String,
  maintainer: String,
  private: Boolean,
  maintainer_email: String,
  num_tags: Number,
  id: String,
  metadata_created: String,
  relationships: Array,
  license: String,
  metadata_modified: Date,
  author: String,
  author_email: String,
  download_url: String,
  state: String,
  version: String,
  creator_user_id: String,
  type: String,
  resources: Array,
  num_resources: Number,
  tags: Array,
  groups: Array,
  license_id: String,
  organization: Object,
  name: String,
  isopen: Boolean,
  notes_rendered: String,
  url: String,
  ckan_url: String,
  notes: String,
  owner_org: String,
  ratings_average: Number,
  extras: Object,
  ratings_count: Number,
  title: String,
  revision_id: String
})

module.exports = mongoose.model('Package', PackageSchema)
