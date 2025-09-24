// Product model for Ashrafi Graphic
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});


module.exports = mongoose.model('Product', productSchema);
