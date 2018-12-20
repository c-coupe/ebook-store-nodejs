const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , session = require("express-session")
  , MongoStore = require('connect-mongo')(session)
  , flash = require('connect-flash')
  , methodOverride = require('method-override')
  , helmet = require("helmet")

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

/* ===== RESTIFY ===== */
app.use(methodOverride())

/* ===== Helmet ===== */
app.use(helmet())

/* ===== AUTH ===== */
const User = require('./models/user')
passport.use(new LocalStrategy(
    {passReqToCallback : true},
    function(req, username, password, done) {
        // attempt to authenticate user
        User.getAuthenticated(username, password, function(err, user, reason) {
            if (err) throw err;

            // login was successful if we have a user
            if (user) {
                // handle login success
                console.log('login success');
                done(null, user);
            }
            var reasons = User.failedLogin;
            switch (reason) {
                case reasons.NOT_FOUND:
                    console.log('login failed : NOT_FOUND');
                    break;
                case reasons.PASSWORD_INCORRECT:
                    console.log('login failed : PASSWORD_INCORRECT');
                    break;
                case reasons.MAX_ATTEMPTS:
                    console.log('login failed : MAX_ATTEMPTS');
                    break;
            }
            done(null, false, { message: "Invalid username/password" });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
    User.findById(userId, (err, user) => done(err, user));
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