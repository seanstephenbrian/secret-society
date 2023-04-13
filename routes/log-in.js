var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
    if (req.query.failed) {
        res.render('log-in', { error: 'Log-in failed. Please make sure email and password are correct.'});
    }
    res.render('log-in');
});

router.post('/',
    passport.authenticate(
        'local',
        { failureRedirect: '/log-in?failed=true' }
    ),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;
