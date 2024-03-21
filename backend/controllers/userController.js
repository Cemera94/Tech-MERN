const Users = require('../models/userModel');
const AppError = require('../utils/AppError');
const Email = require('../utils/Email');
const catchAsync = require('../utils/catchAsync');

// ******************
// *****REGISTER*****
// ******************
exports.register = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    console.log(req.body, 'body');
    const newUser = new Users(req.body);
    console.log(newUser);
    const saveNewUser = await newUser.save();

    // SENDING EMAIL
    const url = 'www.localhost.com';
    await new Email(saveNewUser, url).sendWelcome();

    console.log(saveNewUser);
    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
    });
  } else {
    return next(new AppError('User already exists', 400));
  }
});

// ***************
// *****LOGIN*****
// ***************
exports.login = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(
      new AppError('Incorrect email or password, user not found', 401)
    );
  }

  if (user.password === req.body.password) {
    res.status(200).json({
      status: 'success',
      message: 'User successfully logged in',
    });
  } else {
    return next(new AppError('Incorrect credentials', 401));
  }
});
