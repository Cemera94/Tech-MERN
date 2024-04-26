const jwt = require('jsonwebtoken');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');
const Users = require('../models/userModel');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  let decoded;

  // Da li token postoji
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  // Da li je token validan preko JWT Secret

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err)
      return next(new AppError('Unmathced or expired token, must login', 401));
    else decoded = data;
  });

  // Da li postoji korisnik sa ovim tokenom

  const freshUser = await Users.findById(decoded.id);

  // Na kraju cemo da setujemo korisnika i da nastavimo u sledeci middleware
  req.user = freshUser;

  next();
});
