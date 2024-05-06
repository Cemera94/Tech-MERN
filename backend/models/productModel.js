const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  allRatings: {
    type: Array,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
});

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
