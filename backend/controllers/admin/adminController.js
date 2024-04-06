const Product = require('../../models/productModel');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

exports.addProduct = catchAsync(async (req, res, next) => {
  console.log(req.body, 'req.body');
  console.log(req.file, 'req.files');
  const productData = JSON.parse(req.body.product);
  console.log(productData, 'productData');

  if (req.file) {
    productData.image = req.file.filename;
  } else {
    return next(new AppError('Image is required', 404));
  }

  const newProduct = new Product(productData);
  console.log(newProduct);
  await newProduct.save();

  res.status(200).json({
    status: 'success',
    message: 'Product created successfully',
  });
});
