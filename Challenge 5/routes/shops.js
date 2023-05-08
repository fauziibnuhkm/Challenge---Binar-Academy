const router = require('express').Router();

const shopController = require('../controller/shopController');

// middleware
const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// API
// shops
// bikin API shops tidak dapat diakses kecuali oleh admin/superadmin
// get dan search bisa diakses semua role
router.get('/', shopController.getShops)
router.post('/create', Auth, checkRole('admin'), shopController.createShop)
router.get('/search', Auth, shopController.searchShops)
router.get('/:id', Auth, checkRole, shopController.getShopById)
router.put('/:id', Auth, shopController.editShop)
router.delete('/:id', Auth, shopController.deleteShop)

// module exports
module.exports = router