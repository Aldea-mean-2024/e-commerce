const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const adminController = require('../controllers/adminController');

const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }
};


router.get('/admin', isAdmin, mainController.getAdminPage);
router.get('/accounts', isAdmin, adminController.getAccountsPage);
router.get('/products', isAdmin, adminController.getProductsPage);
router.get('/orders', isAdmin, adminController.getOrdersPage);
router.get('/transactions', isAdmin, adminController.getTransactionsPage);

module.exports = router;
