const router = require('express').Router();
const dashboardController = require('../controller/dashboardController');

router.get('/', dashboardController.getDashboard)
router.get('/create', dashboardController.createDashboard)
router.get('/edit/:id', dashboardController.editDashboard)
router.get('/delete/:id', dashboardController.deleteDashboard)

module.exports = router


