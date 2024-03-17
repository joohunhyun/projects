const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const path = require('path');

router.get('/', (req, res) => {
    if (req.session.user && req.session.user.role === 'student') {
        res.sendFile(path.join(__dirname, '../../views/student/viewLecture.html'));
    }
    else{
        res.status(403).send('Access denied');
    }
});

router.post('/registercourses', async (req, res) => {
    if (req.session.user && req.session.user.role === 'student') {
        try {
            const { lectureId } = req.body;
            const userId = req.session.user.id;

            // Check if the registration already exists
            const checkSql = 'SELECT * FROM lecture_registrations WHERE user_id = ? AND lecture_id = ?';
            const [results] = await db.promise().query(checkSql, [userId, lectureId]);

            if (results.length > 0) {
                // Registration already exists
                return res.status(409).send('Registration already exists');
            } else {
                // Insert the new registration
                const insertSql = 'INSERT INTO lecture_registrations (user_id, lecture_id) VALUES (?, ?)';
                await db.promise().query(insertSql, [userId, lectureId]);
                res.send('Registered for lecture successfully');
            }
        } catch (err) {
            console.error('Error processing registration:', err);
            // res.status(500).send('Error registering for lecture');
        }
    }
    else{
        res.status(403).send('Access denied');
    }
});

module.exports = router;