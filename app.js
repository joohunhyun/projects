const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;
const db = require('./db/db');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const lecturesRouter = require('./routes/professor/lectures');

const professorRouter = require('./routes/professor');
const studentRouter = require('./routes/student');


app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/lectures', lecturesRouter);

app.use('/professor', professorRouter);
app.use('/student', studentRouter);


app.listen(PORT, () => {
    console.log(`app.js: Server is running on port ${PORT}`);
});