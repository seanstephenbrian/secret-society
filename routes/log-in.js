var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
    if (req.session.messages) {
        res.render('log-in', { error: req.session.messages[req.session.messages.length - 1] });
        return;
    }
    res.render('log-in');
});

router.post('/',
    passport.authenticate(
        'local',
        { failureRedirect: '/log-in', failureMessage: true }
    ),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;
