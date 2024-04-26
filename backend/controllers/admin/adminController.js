const Product = require('../../models/productModel');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const fs = require('fs');
const path = require('path');

exports.addProduct = catchAsync(async (req, res, next) => {
  const productData = JSON.parse(req.body.product);

  if (req.file) {
    productData.image = req.file.filename;
  } else {
    return next(new AppError('Image is required', 404));
  }

  const newProduct = new Product(productData);
  await newProduct.save();

  res.status(200).json({
    status: 'success',
    message: 'Product created successfully',
  });
});

exports.deleteSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.deleteOne({ _id: req.params.productID });
  console.log(product, 'product');

  if (product.acknowledged && product.deletedCount === 1) {
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      req.params.productImage
    );

    fs.unlink(imagePath, (err) => {
      if (err) {
        return next(new AppError("Couldn't delete product)", 401));
      }
    });

    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } else {
    return next(new AppError('Nemate nijedan ovakav proizvod', 404));
  }
});
