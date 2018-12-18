const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
// app.use(require('./middlewares/users'))
app.use(require('./controllers'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))