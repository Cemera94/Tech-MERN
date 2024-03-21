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
      return next(new AppError('Something went wrong', 500));
    });
  };
};
