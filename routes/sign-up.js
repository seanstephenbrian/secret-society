var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/', 
    (req, res) => {
        const dummyReq = {
            firstName: '',
            lastName: '',
            email: ''
        }
        res.render('sign-up', { req: dummyReq })
    }
);

router.post('/',
    [
        body('firstName')
            .trim()
            .isString()
            .isLength( { min: 1 } )
            .withMessage('First name is required.')
            .isLength( { max: 30 } )
            .withMessage('First name cannot be longer than 30 characters.'),
        body('lastName')
            .trim()
            .isString()
            .isLength( { min: 1 } )
            .withMessage('Last name is required.')
            .isLength( { max: 30 } )
            .withMessage('Last name cannot be longer than 30 characters.'),
        body('email')
            .trim()
            .isLength( { min: 3, max: 320 } )
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Email must be a valid email address.'),
        body('password')
            .trim()
            .isString()
            .isLength( { min: 8 } )
            .withMessage('Password must be at least 8 characters long.')
            .isLength( { max: 100 } )
            .withMessage('Password cannot be more than 100 characters long.'),
        body('confirmPassword')
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Password confirmation must match password.')
    ],
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('sign-up', { errors: errors.array(), req: req.body });
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
