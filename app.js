var express = require('express');
var path = require('path');
require('dotenv').config();
var createError = require('http-errors');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
const adminRouter = require('./routes/become-admin');
const deleteRouter = require('./routes/delete');
const editRouter = require('./routes/edit');
const logInRouter = require('./routes/log-in');
const logOutRouter = require('./routes/log-out');
const memberRouter = require('./routes/become-a-member');
const newMessageRouter = require('./routes/new-message');
const signUpRouter = require('./routes/sign-up');

const User = require('./models/user');

var app = express();

// set up mongoose connection:
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// view engine setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// passportjs setup:
passport.use(
    new LocalStrategy(async(username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: 'Invalid email' });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            });
        } catch(err) {
            return done(err);
        };
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    secret: "cats", 
    resave: false,
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// routers:
app.use('/', indexRouter);
app.use('/become-admin', adminRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter);
app.use('/log-in', logInRouter);
app.use('/log-out', logOutRouter);
app.use('/become-a-member', memberRouter);
app.use('/new-message', newMessageRouter);
app.use('/sign-up', signUpRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
