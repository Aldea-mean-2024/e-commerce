const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('index');
});
const path = require('path');
app.get('/home', (req, res) => {
    console.log('Home route accessed');
    res.render('partials/index_body');
});

app.get('/shop', (req, res) => {
    console.log('Shop route accessed');
    res.render('partials/Shop_body');
});

app.get('/account', (req, res) => {
    console.log('Account route accessed');
    res.render('partials/account_body');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
