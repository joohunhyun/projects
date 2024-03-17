const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db/db');
const path = require('path');

router.get('/', (req, res) => {
    // Update the path to where your login.html file is located
    res.sendFile(path.join(__dirname, '../views', 'register.html'));});

router.post('/', async (req, res) => {
    // Add your database connection code here

    const { username, password, name, student_number, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const sql = 'INSERT INTO users (username, password, name, student_number, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, hashedPassword, name, student_number, role], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error registering new user');
        } else {
            res.send('User registered successfully');
        }
    });
});

module.exports = router;
