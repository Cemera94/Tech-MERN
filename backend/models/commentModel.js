const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {
    type: String,
    required: [true, 'You must be logged in'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
  },
  status: {
    type: Boolean,
    default: false,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
  product_title: {
    type: String,
  },
});

const commentModel = mongoose.model('comments', commentSchema);
module.exports = commentModel;
