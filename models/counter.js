var mongoose = require('mongoose');

var CounterSchema = mongoose.Schema({
  name: {type: String, index: true, unique: true},
  seq: Number,
});

var Counter = mongoose.model('Counter', CounterSchema);
exports.Counter = Counter;
