var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
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
  price: {
    type: Number,
    required: true
  },
  categories: [mongoose.Schema.Types.Mixed]
});

var Product = mongoose.model('Product', ProductSchema);
exports.Product = Product;