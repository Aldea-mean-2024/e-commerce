const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signUp);

router.post('/login', authController.login);

router.get('/account', (req, res) => {
    res.render('partials/account_body');
}); 


module.exports = router;
