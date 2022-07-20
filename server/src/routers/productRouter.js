const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/productController.js');

const authController = require('../app/controllers/authController.js');
const multerHelper = require('../helpers/multer.js');

router.get('/', productController.getProducts);
router.post('/', multerHelper.cpUploadArray, productController.createProduct);

router.get('/:id', productController.getProductById);

module.exports = router;
