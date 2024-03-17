const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const path = require('path');

router.get('/', (req, res) => {
    if (req.session.user && req.session.user.role === 'student') {
        res.sendFile(path.join(__dirname, '../../views/student/viewPosts.html'));
    }
    else{
        res.status(403).send('Access denied');
    }
});

router.get('/data', (req, res) => {

    const studentId = req.session.user.id; // Assuming the student's ID is stored in the session

    // Adjust the query based on your needs and data structure
    const sql = `
        SELECT lectures.id AS lectureId, lectures.title, lectures.description, posts.id AS postId, posts.content
        FROM lecture_registrations
        JOIN lectures ON lectures.id = lecture_registrations.lecture_id
        LEFT JOIN posts ON posts.lecture_id = lectures.id
        WHERE lecture_registrations.user_id = ?
        ORDER BY lectures.id
    `;
    console.log(sql);

    db.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching registered lectures:', err);
            return res.status(500).send('Error fetching data');
        }
        // Organize lectures and posts for easier frontend consumption
        const lectures = results.reduce((acc, curr) => {
            if (!acc[curr.lectureId]) {
                acc[curr.lectureId] = {
                    id: curr.lectureId,
                    title: curr.title,
                    description: curr.description,
                    posts: []
                };
            }
            if (curr.postId) { // If there's a post associated
                acc[curr.lectureId].posts.push({
                    id: curr.postId,
                    content: curr.content,
                    created_at: curr.created_at
                });
            }
            return acc;
        }, {});
        
        res.json(Object.values(lectures)); // Convert to array and send back
    });
});

module.exports = router;
