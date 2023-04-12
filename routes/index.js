var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render(
        'index', 
        { 
            title: 'Secret Society',
            user: req.user
        }
    );
});

router.get('/success', function(req, res, next) {
    res.send('success');
});

router.get('/failure', function(req, res, next) {
    res.send('failure');
});

module.exports = router;
