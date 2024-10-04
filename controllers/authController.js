const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '',
    database: 'ecommerce'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    const { first_name, last_name, email, password, phone_number, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (first_name, last_name, email, password, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, email, hashedPassword, phone_number, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('An error occurred.');
        }
        console.log('User registered:', result);
        res.redirect('/');
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.send('An error occurred.');
        }

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json({
                    success: true,
                    balance: user.balance
                });
            } else {
                res.json({ success: false, message: 'Invalid email or password.' });
            }
        } else {
            res.json({ success: false, message: 'Invalid email or password.' });
        }
    });
};





