var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const Message = require('../models/message');

router.get('/', function(req, res, next) {
    res.render('new-message');
});

router.post('/',
    [
        body('title')
            .trim()
            .isString()
            .isLength( { min: 1 } )
            .withMessage('Message title is required.')
            .isLength( { max: 100 })
            .withMessage('Message title cannot be longer than 100 characters'),
        body('body')
            .trim()
            .isString()
            .isLength( { min: 1 } )
            .withMessage('Message cannot be empty.')
            .isLength( { max: 1000 } )
            .withMessage('Message cannot be longer than 1000 characters')
    ],
    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('new-message', { errors: errors.array(), req: req.body });
        }

        try {
            const message = new Message({
                author: req.body.author,
                title: req.body.title,
                timestamp: new Date(),
                body: req.body.body
            });
            const result = await message.save();
            res.redirect('/');
        } catch(err) {
            return next(err);
        };
    }
);

module.exports = router;