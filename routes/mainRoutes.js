const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }
};

router.get('/', mainController.getHomePage);
router.get('/shop', mainController.getShopPage);
router.get('/about', mainController.getAboutPage);

router.get('/admin', isAdmin, mainController.getAdminPage);

router.post('/signup', mainController.signUp);
router.post('/login', mainController.login);
router.get('/logout', mainController.logout);

module.exports = router;
