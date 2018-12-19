const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    username: String,
    password: String
})

schema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

var User = mongoose.model('User', schema);

module.exports = User;
