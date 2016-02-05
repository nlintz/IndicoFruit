var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    fruitSchema;

fruitSchema = new Schema({
  name: String,
  p_exists: Number,
  createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Fruit', fruitSchema);
