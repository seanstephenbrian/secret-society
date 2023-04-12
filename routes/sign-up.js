var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => res.render('sign-up'));

router.post('/', async (req, res, next) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        const result = await user.save();
        res.redirect('./');
    } catch(err) {
        return next(err);
    };
});

module.exports = router;
