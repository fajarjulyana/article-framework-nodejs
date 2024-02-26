// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan nama pengguna MySQL Anda
    password: '', // Ganti dengan kata sandi MySQL Anda
    database: 'newsdb' // Ganti dengan nama database Anda
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});

module.exports = connection;
