const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const User = require('../../models/userModel');
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

exports.updateProduct = catchAsync(async (req, res, next) => {
  const productData = req.body.product
    ? JSON.parse(req.body.product)
    : req.body;

  console.log(productData);

  const product = await Product.findById(productData._id);

  if (!product) next(new AppError('Nemate nijedan ovakav proizvod', 404));

  if (req.file) {
    if (product.image) {
      const oldImage = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        product.image
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }
    }

    productData.image = req.file.filename;
  }

  const updatedProduct = await Product.findByIdAndUpdate(productData._id, {
    title: productData.title,
    description: productData.description,
    price: productData.price,
    image: productData.image,
    category: productData.category,
  });

  if (updatedProduct) {
    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
    });
  } else next(new AppError('Unsuccessful', 401));
});

exports.addCategory = catchAsync(async (req, res, next) => {
  const category = JSON.parse(req.body.category);

  if (req.file) {
    category.image = req.file.filename;
  } else next(new AppError('Image is required', 401));

  const newCategory = new Category(category);
  await newCategory.save();

  res.status(200).json({
    status: 'success',
    message: 'Category created successfully',
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await Category.find();

  if (allCategories) {
    return res.status(200).json({
      status: 'success',
      allCategories,
    });
  } else next(new AppError('Nemate nijedan kategorija', 404));
});

exports.deleteSingleCategory = catchAsync(async (req, res, next) => {
  const category = await Category.deleteOne({
    _id: req.params.categoryID,
  });

  console.log(category, 'delete category');

  if (category.acknowledged && category.deletedCount === 1) {
    const categoryImagePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      req.params.categoryImage
    );

    fs.unlink(categoryImagePath, (err) => {
      if (err) {
        return next(new AppError("Couldn't delete category)", 401));
      }
    });
    return res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully',
    });
  } else {
    return next(new AppError('Nemate nijedan ovakav proizvod', 404));
  }
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const formDataCategory = req.body.category
    ? JSON.parse(req.body.category)
    : req.body;

  const category = await Category.findById(formDataCategory._id);

  if (!category) next(new AppError('Nemate nijedan ovakav proizvod', 404));

  if (req.file) {
    if (category.image) {
      const oldImage = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        category.image
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }
    }

    formDataCategory.image = req.file.filename;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    formDataCategory._id,
    {
      title: formDataCategory.title,
      description: formDataCategory.description,
      image: formDataCategory.image,
    }
  );

  if (updatedCategory) {
    return res.status(200).json({
      status: 'success',
      message: 'Category updated successfully',
    });
  } else next(new AppError("Couldn't update category", 401));
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  if (users.length > 0) {
    res.status(200).json({
      status: 'success',
      users,
    });
  } else next(new AppError('Nemate nijednog korisnika', 404));
});
