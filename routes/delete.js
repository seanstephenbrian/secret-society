var express = require('express');
var router = express.Router();

const Message = require('../models/message');

router.get('/:id', function(req, res, next) {
    Message.findOne({ _id: req.params.id }, 'message')
        .populate('title body')
        .then((message) => {
            res.render('delete-message', { message: message });
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/', function(req, res, next) {
    res.send('delete');
});

module.exports = router;
