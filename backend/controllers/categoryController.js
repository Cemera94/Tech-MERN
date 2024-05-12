const Category = require('../models/categoryModel');
const Products = require('../models/productModel');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  if (req.params.title.includes(' ')) {
    let words = req.params.title.split(' ');

    let params = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    let joinedParams = params.join(' ');

    const products = await Products.find({ category: joinedParams });

    if (products) {
      return res.status(200).json({
        status: 'success',
        products,
      });
    } else next(new AppError(404, 'Product not found', 401));
  }

  const params =
    req.params.title.charAt(0).toUpperCase() + req.params.title.slice(1);
  const products = await Products.find({ category: params });

  if (products) {
    return res.status(200).json({
      status: 'success',
      products,
    });
  } else next(new AppError(404, 'Product not found', 401));
});

exports.getCategory = catchAsync(async (req, res, next) => {
  if (req.params.title.includes(' ')) {
    let words = req.params.title.split(' ');

    let params = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    let joinedParams = params.join(' ');

    const category = await Category.findOne({ title: joinedParams });

    if (category) {
      return res.status(200).json({
        status: 'success',
        category,
      });
    } else next(new AppError(404, 'Product not found', 401));
  }

  const params =
    req.params.title.charAt(0).toUpperCase() + req.params.title.slice(1);
  const category = await Category.findOne({ title: params });

  if (category) {
    return res.status(200).json({
      status: 'success',
      category,
    });
  } else next(new AppError(404, 'Product not found', 401));
});
