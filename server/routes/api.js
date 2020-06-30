const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

const mongoose = require('mongoose');
const db = 'mongodb+srv://bdadmin:Rq5jumVWmakYDfaW@cluster0-4fmlh.mongodb.net/testauth?retryWrites=true&w=majority';

mongoose.connect(db, err => {
    const log = err ? 'Error:' + err : 'Connect to db!!!!';
    console.log(log);
});

function verifyToken(req, res, next) {
    if (!req.headers.autorization) {
        return res.status(401).send('Unauthorized request!');
    }

    let token = req.headers.autorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send('Unauthorized request!');
    }

    let payload = jwt.verify(token, 'secretKey');

    if (!payload) {
        return res.status(401).send('Unauthorized request!');
    }

    req.userId = payload.subject;
    next();
}

router.get('/', (req, res, next) => {
    res.send('From API rout');
});

router.post('/register', (req, res, next) => {
    let userData = req.body;
    console.log('...... register >>', userData);
    let user = new User(userData);

    user.save((error, registeredUser) => {
        if (error) {
            console.log('Error saving user:', error)
        } else {
            const payload = { subject: registeredUser._id };
            const token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
            // res.status(200).send(registeredUser); // before jwt
        }
    });
});

router.post('/login', (req, res, next) => {
    let userData = req.body;
    console.log('...... login >>', userData);
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log('Error find user:', error);
            return;
        }

        if (!user) {
            res.status(401).send('Invalid email!');
            return;
        }

        if (user.password !== userData.password) {
            res.status(401).send('Invalid password!');
        } else {
            const payload = { subject: user._id };
            const token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
            // res.status(200).send(user) // before jwt
        }
    });
});

router.get('/users', (req, res, next) => {
    const users = [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"
        },
        {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"
        },
        {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"
        },
        {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg"
        }
    ];

    res.json(users);
});

// api safety by jwt verifyToken
router.get('/admin', verifyToken, (req, res, next) => {
    const importantInform = {
        title: 'Safety information!',
        description: 'It is verification by token'
    };

    res.json(importantInform);
});

module.exports = router;