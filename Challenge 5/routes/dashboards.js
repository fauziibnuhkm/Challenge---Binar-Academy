const router = require('express').Router();

const dashboardController = require('../controller/dashboardController');


router.get('/', dashboardController.getDash)

router.get('/admin/products', dashboardController.getDashboards)

router.get('/admin/products/create', dashboardController.createDashboard)

router.post('/products/create', upload.single('image'), dashboardController.editDashboard)

router.get('/admin/products/edit/:id', dashboardController.getDashboardById)

router.post('/products/update/:id', dashboardController.updateDashboard)

router.post('/products/delete/:id', dashboardController.deleteDashboard)


module.exports = router


