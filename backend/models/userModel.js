const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    // match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/, 'Email is not valid'],
  },
  password: {
    type: 'String',
    required: [true, 'Password is required'],
    // validate: {
    //   validator: function (password) {
    //     // Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.
    //     const regularExpression =
    //       /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    //     return regularExpression.test(password);
    //   },
    //   message:
    //     'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.',
    // },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  postCode: {
    type: String,
  },
  votedFor: {
    type: Array,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
