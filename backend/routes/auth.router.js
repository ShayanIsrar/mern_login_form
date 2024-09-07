const { signup, login } = require('../controllers/auth.controller');
const { signupValidation, loginVaidation } = require('../middlewares/auth.validation');

const router = require('express').Router();

router.post('/login', loginVaidation, login)
router.post('/signup', signupValidation, signup)

module.exports = router;