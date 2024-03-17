const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const path = require('path');

// Get lectures (for professors to see their own lectures, students to see all)
// This route now clearly serves for fetching lecture data in JSON format
router.get('/', (req, res) => {
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


// POST request for addLecture.html
router.post('/', (req, res) => {
    if (req.session.user && req.session.user.role === 'professor') {
        const { title, description } = req.body;
        const userId = req.session.user.id;
        const sql = 'INSERT INTO lectures (title, description, user_id) VALUES (?, ?, ?)';
        db.query(sql, [title, description, userId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error adding lecture');
            } else {
                res.send('Lecture added successfully');
            }
        });
    } else {
        res.status(403).send('Access denied');
    }
});

module.exports = router;
