var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    alertSchema;

var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
alertSchema = new Schema({
  email: String,
  lastAlertSentAt: {type: Date, default: yesterday},
  createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Alert', alertSchema);
