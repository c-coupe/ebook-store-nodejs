const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , session = require("express-session")
  , MongoStore = require('connect-mongo')(session)
  , flash = require('connect-flash')

/* ===== BDD ===== */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/workshopdatabase', {useNewUrlParser: true})

// on success
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to db')
})

// on error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err)
})

/* ===== AUTH ===== */
const User = require('./models/user')
passport.use(new LocalStrategy(
    {passReqToCallback : true},
    function(req, username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use(session({
    secret: 'workshop-node.js-2018-12',
    name: 'ccoes',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/* ===== RENDER ===== */
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
// app.use(require('./middlewares/users'))
app.use(require('./controllers'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))