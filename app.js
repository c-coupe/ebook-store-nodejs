const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')


/* ===== BDD ===== */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/database')

// on success
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to db')
})

// on error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err)
})

/* ===== RENDER ===== */
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
// app.use(require('./middlewares/users'))
app.use(require('./controllers'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))