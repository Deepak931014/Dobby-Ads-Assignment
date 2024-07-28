const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js');

const {
    registerUser,
    loginUser,
} = require('../controllers/usersControls.js')

router.post('/register', registerUser)

router.post('/login', loginUser);

module.exports = router;