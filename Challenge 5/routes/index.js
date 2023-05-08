const router = require('express').Router();

// import package swagger 
const swaggerUi = require('swagger-ui-express');

// import file json
const swaggerDocument = require('../docs/swagger.json')

// API docs => dokumentasi API
router.use('/api-docs', swaggerUi.serve)
router.use('/api-docs', swaggerUi.setup(swaggerDocument))

const Dashboard = require('./dashboard');
const User = require('./users');
const Product = require('./products');
const Shop = require('./shops');

router.use('/dashboard/products', Dashboard);
router.use('/api/v1/users', User);
router.use('/api/v1/products', Product);
router.use('/api/v1/shops', Shop);

// module exports
module.exports = router