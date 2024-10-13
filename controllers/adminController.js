const User = require('../models/userModel');

exports.getAccountsPage = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        const userCount = users.length;
        res.render('admin', { contentAdmin: 'admin/accounts', users, userCount });
    } catch (error) {
        console.error(error);
        res.redirect('/admin');
    }
};

exports.getProductsPage = (req, res) => {
    res.render('admin', { contentAdmin: 'admin/products' });
};
exports.getOrdersPage = (req, res) => {
    res.render('admin', { contentAdmin: 'admin/orders' });
};
exports.getTransactionsPage = (req, res) => {
    res.render('admin', { contentAdmin: 'admin/transactions' });
};
