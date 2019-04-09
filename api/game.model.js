const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema({
  name: {
    type: String
  },
  publisher: {
    type: String
  },
  price: {
    type: Number
  }
},{
    collection: 'game'
});

module.exports = mongoose.model('Game', Game);