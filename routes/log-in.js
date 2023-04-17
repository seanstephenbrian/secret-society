var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('log-in');
});

router.get('/failed', function(req, res, next) {
    res.render('log-in', { error: 'Log-in failed. Please make sure email and password are correct.'});
});

router.post('/failed', function(req, res, next) {
    res.render('log-in', { error: 'Log-in failed. Please make sure email and password are correct.'});
})

router.post('/',
    passport.authenticate(
        'local',
        { failureRedirect: '/log-in/failed' }
    ),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;
