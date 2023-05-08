const router = require('express').Router();

const productController = require('../controller/productController');

// middleware
const Auth = require('../middleware/auth');

// API
// product
// bikin API product ini :
// 1) get bisa diakses oleh semua role
// 2) create update bisa diakses oleh role admin dan superadmin
// 3) delete hanya bisa diakses oleh superadmin
router.get('/', Auth, productController.getProducts)
router.post('/', Auth, productController.createProduct)
router.get('/search', Auth, productController.searchProduct)
router.get('/:id', Auth, productController.getProductById)
router.put('/:id', Auth, productController.editProduct)
router.delete('/:id', Auth, productController.deleteProduct)

// module exports
module.exports = router