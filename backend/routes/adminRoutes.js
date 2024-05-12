const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/admin/adminController');
const authorizationValidation = require('../utils/authorizationValidation');

const upload = multer({ dest: 'uploads/' });

// ADD-PRODUCT
router
  .route('/product/:productID?/:productImage?')
  .post(
    authorizationValidation.protect,
    upload.single('file'),
    adminController.addProduct
  )
  .delete(authorizationValidation.protect, adminController.deleteSingleProduct)
  .put(
    authorizationValidation.protect,
    upload.single('file'),
    adminController.updateProduct
  );

router
  .route('/category/:categoryID?/:categoryImage?/:categoryTitle?')
  .post(
    authorizationValidation.protect,
    upload.single('file'),
    adminController.addCategory
  )
  .get(adminController.getAllCategories)
  .delete(authorizationValidation.protect, adminController.deleteSingleCategory)
  .put(
    authorizationValidation.protect,
    upload.single('file'),
    adminController.updateCategory
  );

router.route('/users').get(adminController.getAllUsers);

module.exports = router;
