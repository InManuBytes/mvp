const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/haikus');
const Promise = require('bluebird');

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('db connected'));

let haikuSchema = mongoose.Schema({
  _id: Number,
  author: String,
  haiku: [String]
});

let Haiku = mongoose.model('Haiku', haikuSchema);

module.exports = { db, Haiku };