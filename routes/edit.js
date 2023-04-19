var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const Message = require('../models/message');

router.get('/:id', function(req, res, next) {
    Message.findOne({ _id: req.params.id }, 'message')
        .populate('title body')
        .then((message) => {
            res.render('edit-message', { message: message });
        })
        .catch((err) => {
            console.log(err);
            res.render('edit-message');
        });
});

router.post(
    '/', 
    [
        body('title')
            .trim()
            .isString()
            .isLength( { min: 1 } )
            .withMessage('Message title cannot be empty.')
            .isLength( { max: 100 })
            .withMessage('Message title cannot be longer than 100 characters'),
        body('body')
            .trim()
            .isString()
            .isLength( { min: 1 } )
            .withMessage('Message body cannot be empty.')
            .isLength( { max: 1000 } )
            .withMessage('Message body cannot be longer than 1000 characters')
    ],
    async function(req, res, next) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render(
                'edit-message', 
                { 
                    errors: errors.array(), 
                    message: { 
                        id: req.body.id,
                        title: req.body.title,
                        body: req.body.body
                    } 
                }
            );
        }

        try {
            const message = await Message.findByIdAndUpdate(
                req.body.id, 
                { 
                    title: req.body.title,
                    body: req.body.body
                }
            );
            if (!message) {
                const err = new Error('Unable to update message.');
                return next(err);
            }
            res.redirect('/');
        } catch(err) {
            return next(err);
        }
    }
);

module.exports = router;
