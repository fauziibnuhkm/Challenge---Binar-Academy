const router = require('express').Router();

const userController = require('../controller/userController');

// middleware
const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');


// API
// users
// /register = endpoint
router.get('/', userController.getUsers)
router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/:id', Auth , userController.getUserById)
router.put('/:id', Auth , userController.editUser)
router.delete('/:id', Auth , userController.deleteUser)

// module exports
module.exports = router