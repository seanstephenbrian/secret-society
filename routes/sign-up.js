var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/', (req, res) => res.render('sign-up'));

router.post('/',
    [
        body('firstName')
            .trim()
            .exists()
            .isString()
            .isLength( { max: 30 } ),
        body('lastName')
            .trim()
            .exists()
            .isString()
            .isLength( { max: 30 } ),
        body('email')
            .trim()
            .exists()
            .isEmail()
            .isLength( { min: 3, max: 320 } ),
        body('password')
            .trim()
            .exists()
            .isString()
            .isLength( { max: 100 } ),
        body('confirmPassword')
            .trim()
            .exists()
            .isString()
            .custom((value, { req }) => value === req.body.password),
    ],
    (req, res, next) => {
        console.log('1');
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
    }
);

module.exports = router;
