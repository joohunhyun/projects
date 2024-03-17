const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const path = require('path');

router.post('/', (req, res) => {
    if (req.session.user && req.session.user.role === 'professor') {

        const { lectureId, content } = req.body;

        if (!lectureId || !content) {
            return res.status(400).send('Lecture ID and content are required.');
        }

        // Insert the new post into the database
        const sql = 'INSERT INTO posts (lecture_id, content) VALUES (?, ?)';
        db.query(sql, [lectureId, content], (err, result) => {
            if (err) {
                console.error('db.query error in viewlectures');
                return res.status(500).send('Error creating post for the lecture');
            }
            res.send('Post created successfully');
        });
    }
    else{
        res.status(403).send('Access denied');}
});

module.exports = router;