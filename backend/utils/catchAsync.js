const AppError = require('./AppError');

module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => {
      console.error(error, 'CatchAsync error');
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((el) => el.message);
        const message = messages.join('. ');
        return next(new AppError(message, 400));
      }
      switch (error?.type) {
        case 'StripeCardError':
          return next(
            new AppError(`A payment error occurred: ${error.message}`, 404)
          );
        case 'StripeInvalidRequestError':
          return next(new AppError('An invalid request occurred.', 404));
        default:
          return next(
            new AppError(
              'Another problem occurred, maybe unrelated to Stripe.',
              404
            )
          );
      }
    });
  };
};
