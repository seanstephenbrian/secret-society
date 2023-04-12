var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('log-in');
});

router.post(
    '/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

module.exports = router;
