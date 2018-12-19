const mongoose = require('mongoose')
const User = require('../models/user')

var usersData = [
    { username: "admin", password: "admin" },
    { username: "ccoupe", password: "ccoupe" }
];

mongoose.connect('mongodb://127.0.0.1:27017/workshopdatabase', {useNewUrlParser: true})

// on success
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to db')

    try {
        User.insertMany(usersData, function(err) { if (err) console.log(err) });
        console.log('Import successfully')
    } catch (err) {
        console.log(err);
    }
})

// on error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err)
})
