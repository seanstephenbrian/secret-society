var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/', (req, res) => res.render('sign-up'));

router.post('/', async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        } else {
            try {
                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword
                });
                const result = await user.save();
                res.redirect('./');
            } catch(err) {
                return next(err);
            };
        }
    });
});

module.exports = router;
