const db = require('../config/db');

const User = {
    create: async (userData) => {
        const { first_name, last_name, email, password, phone_number, address } = userData;
        try {
            const [rows] = await db.execute(
                'INSERT INTO users (first_name, last_name, email, password, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)',
                [first_name, last_name, email, password, phone_number, address]
            );
            return rows;
        } catch (err) {
            throw err;
        }
    },

    findByEmail: async (email) => {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    },
    getAllUsers: async () => {
        try {
            const [rows] = await db.execute('SELECT * FROM users');
            return rows;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = User;