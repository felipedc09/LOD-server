const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const dataset = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});