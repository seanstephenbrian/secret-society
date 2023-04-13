var express = require('express');
var router = express.Router();

const Message = require('../models/message');

router.get('/:id', function(req, res, next) {
    Message.findById(req.params.id)
        .populate('title body')
        .then((message) => {
            res.render('delete-message', { message: message });
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/', async function(req, res, next) {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.body.id);
        if (!deletedMessage) {
            const err = new Error('Unable to delete message.');
            return next(err);
        }
        res.redirect('/');
    } catch(err) {
        return next(err);
    }
});

module.exports = router;
