const express = require('express');
const router = express.Router();
const path = require('path');

const viewlecturesRouter = require('./professor/viewlectures'); // Adjust the path if necessary
router.use('/viewlectures', viewlecturesRouter);

const viewcreatedlecturesRouter = require('./professor/viewcreatedlectures'); // Adjust the path if necessary
router.use('/viewcreatedlectures', viewcreatedlecturesRouter);


router.get('/', (req, res) => {
    if (req.session.user && req.session.user.role === 'professor') {
        res.sendFile(path.join(__dirname, '../views', 'professor.html'));
    }
    else {
        res.status(403).send('Access denied');
    }
});

router.get('/viewlectures', (req, res) => {
    if (req.session.user && req.session.user.role === 'professor') {
    res.sendFile(path.join(__dirname, '..', 'views', 'professor', 'postLecture.html'));
    }
    else {
        res.status(403).send('Access denied');
    }
});

router.get('/lectures', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'professor', 'addLecture.html'));
});

router.get('/viewcreatedlectures', (req, res) => {
    if (req.session.user && req.session.user.role === 'professor') {
        res.sendFile(path.join(__dirname, '../views/professor/', 'viewCreatedLecture.html'));
    }
    else {
        res.status(403).send('Access denied');
    }
});



module.exports = router;
