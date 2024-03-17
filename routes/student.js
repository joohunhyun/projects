// student.js
const express = require('express');
const router = express.Router();
const path = require('path');

console.log(__dirname);

const addlecturesRouter = require('./student/addlectures'); // Adjust the path if necessary
router.use('/addlectures', addlecturesRouter);

const addedlecturesRouter = require('./student/addedlectures'); // Adjust the path if necessary
router.use('/addedlectures', addedlecturesRouter);

// Route to serve student homepage
router.get('/', (req, res) => {
    if (req.session.user && req.session.user.role === 'student') {
        res.sendFile(path.join(__dirname, '..', 'views', 'student.html'));
    }
    else {
        res.status(403).send('Access denied');
    }
});

// Route to serve the lecture viewing/registration page for students
// router.get('/addlectures', (req, res) => {
//     // Assuming 'viewLecture.html' is used by students to view/add lectures,
//     // but consider renaming this file to better match its functionality.
//     res.sendFile(path.join(__dirname, '..', 'views', 'student', 'viewLecture.html'));
// });

// Additional student-specific routes can be added here

module.exports = router;
