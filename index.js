const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

const dbConfig = require('./config/db')
const passportConfig = require('./config/passport')

const accountRoutes = require('./routes/account')

const PORT = 3000

const app = express()

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

passportConfig(passport)

mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('DataBase was connected successfully')
})

mongoose.connection.on('error', (err) => {
  console.log(`DataBase connection error: ${err}`)
})

app.get('/', (req, res) => {
  res.send('The Main page.')
})

app.use('/account', accountRoutes)

app.listen(PORT, () => {
  console.log(`Server has run on the port: ${PORT}`)
})
