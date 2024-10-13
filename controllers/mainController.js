const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getHomePage = (req, res) => {
    res.render('index', { bodyPartial: 'partials/index_body', user: req.session.user || null });
};

exports.getShopPage = (req, res) => {
    res.render('index', { bodyPartial: 'partials/shop', user: req.session.user || null });
};

exports.getAboutPage = (req, res) => {
    res.render('index', { bodyPartial: 'partials/about', user: req.session.user || null });
};

exports.signUp = async (req, res) => {
    const { first_name, last_name, email, password, phone_number, address } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ first_name, last_name, email, password: hashedPassword, phone_number, address });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: 'Error creating account' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (email === 'admin@gmail.com' && password === '1234') {
            req.session.isAdmin = true; // Set admin flag in session
            return res.json({ success: true, redirectUrl: '/admin' });
        } else {
            req.session.isAdmin = false;
        }
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.json({ success: true, redirectUrl: '/' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.json({ success: false, message: 'Login failed' });
    }
};

exports.getAdminPage = async (req, res) => {
    if (req.session.isAdmin) {
        try {
            const users = await User.getAllUsers();
            const userCount = users.length;
            
            res.render('admin', { contentAdmin: 'admin/accounts', userCount, users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};


exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

