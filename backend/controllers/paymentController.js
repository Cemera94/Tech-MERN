const stripe = require('stripe');
const AppError = require('../utils/AppError');
const stripeSecretKey = stripe(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');

exports.makePayment = catchAsync(async (req, res, next) => {
  if (!req.body.amount || !req.body.currency)
    return next(new AppError('Amount or currency not provided', 400));

  const amountInCents = req.body.amount * 100;

  const paymentIntent = await stripeSecretKey.paymentIntents.create({
    amount:
      req.body.currency === 'USD'
        ? amountInCents * 1.07
        : req.body.currency === 'RSD'
        ? amountInCents * 117
        : amountInCents,
    currency: req.body.currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(200).json({
    status: 'success',
    secretKey: paymentIntent.client_secret,
  });
});
