const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/admin/adminController');

const upload = multer({ dest: 'uploads/' });

// ADD-PRODUCT
router
  .route('/add-product')
  .post(upload.single('file'), adminController.addProduct);

module.exports = router;
