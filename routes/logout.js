const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.send('Logged out successfully');
    });
});

module.exports = router;
