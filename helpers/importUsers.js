const mongoose = require('mongoose')
const User = require('../models/user')

var usersData = [
    { username: "admin", password: "admin" },
    { username: "ccoupe", password: "ccoupe" }
];

mongoose.connect('mongodb://127.0.0.1:27017/workshopdatabase', {useNewUrlParser: true})

async function createOrUpdateUserWithEncryptedPassword(user) {
    found = await User.findOne({ username: user.username });
    if (! found) {
        User.create(user)
        return console.log(user.username + ' created');
    }
    found.password = user.password;
    found.save((err) => {
        if(!err) {
            console.log(user.username + ' saved');
        }
        else {
            console.log("Error: " + err);
        }
    })
}
// on success
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to db')

    try {
        // BEFORE
        // User.insertMany(usersData, function(err) { if (err) console.log(err) })

        // IMPORT NEW USERS OR UPDATE OLD USERS
        usersData.forEach((user) => {
            createOrUpdateUserWithEncryptedPassword(user).then((user) => console.log(user)).catch((err)=> console.log(err));
        })

        console.log('Import successfully')
    } catch (err) {
        console.log(err);
    }
})

// on error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err)
})
