var express = require('express');
var router = express.Router();

const Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
    Message.find({}, 'message')
        .sort({ timestamp: -1 })
        .populate('author title timestamp body pinned')
        .then((message_list) => {
            res.render(
                'index', 
                { 
                    title: 'Secret Society',
                    user: req.user,
                    messages: message_list
                }
            );
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;
