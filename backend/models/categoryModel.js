const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
});

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;
