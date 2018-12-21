const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")
const SALT_WORK_FACTOR = 10;

var schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// expose enum on the model, and provide an internal convenience reference
var reasons = schema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

schema.plugin(uniqueValidator);

schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

schema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})

schema.statics.getAuthenticated = function(username, password, cb) {
    this.findOne({ username: username }, function(err, user) {
        if (err) return cb(err);

        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

        // test for a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) return cb(err);

            // check if the password was a match
            if (isMatch) {
                return cb(null, user);
            }
            // password is incorrect
            return cb(null, null, reasons.PASSWORD_INCORRECT);
        });
    });
};

var User = mongoose.model('User', schema);

module.exports = User;
