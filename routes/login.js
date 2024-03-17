const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db/db');
const path = require('path');

// Assuming db is passed as an argument or required at the top
router.get('/', (req, res) => {
    // Update the path to where your login.html file is located
    res.sendFile(path.join(__dirname, '../views', 'login.html'));});


router.post('/', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role
                };
                // Redirect based on the user role
                if (user.role === 'professor') {
                    res.redirect('/professor');
                } else if (user.role === 'student') {
                    res.redirect('/student');
                } else {
                    res.status(403).send('Role not recognized');
                }
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

module.exports = router;