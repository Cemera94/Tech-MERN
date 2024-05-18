const Users = require('../models/userModel');
const AppError = require('../utils/AppError');
const Email = require('../utils/Email');
const catchAsync = require('../utils/catchAsync');
const signToken = require('../utils/signToken');

// ******************
// *****REGISTER*****
// ******************
exports.register = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    const newUser = new Users(req.body);
    console.log(newUser);
    const saveNewUser = await newUser.save();

    // SENDING EMAIL
    const url = 'https://tech-mern-q4mo.onrender.com';
    await new Email(
      { email: saveNewUser.email, username: saveNewUser.username },
      url
    ).sendWelcome();

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
  // Poslali smo u userSchemi select: false da nigde ne prikazuje password.
  // Ovde nam je neophodan i onda smo na kraju pozvali .select('+password')
  const user = await Users.findOne({
    email: req.body.email,
  }).select('+password');
  console.log(user, 'user');
  if (!user) {
    return next(
      new AppError('Incorrect email or password, user not found', 401)
    );
  }

  const correctPassword = await user.checkPassword(
    req.body.password,
    user.password
  );

  // Izbacujemo password pomoću Javascript metode da ne bi slali klijentu njegovu lozinku
  const { password, _id, __v, ...userData } = user.toObject();

  // JWT Token security check
  const token = signToken(user._id);

  if (correctPassword) {
    res.status(200).json({
      status: 'success',
      user: userData,
      token,
    });
  } else {
    return next(new AppError('Incorrect credentials', 401));
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const user = await Users.findOneAndUpdate(
    { email: req.body.email },
    {
      username: req.body.username,
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      postCode: req.body.postCode,
    }
  );
  if (user) {
    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      user,
    });
  }
});
