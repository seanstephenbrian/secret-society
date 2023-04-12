var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('become-a-member');
});

router.post('/', async function(req, res, next) {
    if (req.body.code === process.env.SECRET_CODE) {
        try {
            const user = await User.findByIdAndUpdate(req.body.id, { member: true });
            if (!user) {
                const err = new Error('Unable to locate user.');
                return next(err);
            }
            res.render('welcome');
        } catch(err) {
            return next(err);
        }
    } else {
        res.render('wrong-code');
    }
}
);

module.exports = router;
