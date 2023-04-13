var express = require('express');
var router = express.Router();

const Message = require('../models/message');

router.get('/:id', function(req, res, next) {
    Message.findOne({ _id: req.params.id }, 'message')
        .populate('title body')
        .then((message) => {
            res.render('edit-message', { message: message });
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/', async function(req, res, next) {
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
    
});

module.exports = router;
