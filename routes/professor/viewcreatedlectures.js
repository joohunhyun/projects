const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const path = require('path');

router.get('/lectures', (req, res) => {
    let sql = 'SELECT * FROM lectures';
    if (req.session.user && req.session.user.role === 'professor') {
        sql += ' WHERE user_id = ?';
        db.query(sql, [req.session.user.id], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error fetching lectures');
            } else {
                res.json(results); // Sends lecture data in JSON format
            }
        });
    } else if (req.session.user && req.session.user.role === 'student') {
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error fetching lectures');
            } else {
                res.json(results); // Sends lecture data in JSON format
            }
        });
    } else {
        res.status(403).send('Access denied');
    }
});

module.exports = router;
