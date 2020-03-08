var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  sub_categories: [mongoose.Schema.Types.Mixed],
  products: [mongoose.Schema.Types.Mixed]
});

var Category = mongoose.model('Category', CategorySchema);
exports.Category = Category;