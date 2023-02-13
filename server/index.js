const express = require('express')
const app = express()

const cors = require('cors')
const { default: mongoose } = require('mongoose')
const connectDatabase = require('./db/Database')

app.use(cors({ origin: true }))
app.use(express.json())

// Connection Mongoose DB
mongoose.set('strictQuery', false)
connectDatabase()

// imports Routes
const userRoute = require('./routes/auth')
app.use('/v1/api/user', userRoute)

// Artist Routes imports
const artistsRoute = require('./routes/artist')
app.use('/v1/api/artists', artistsRoute)

// Albums Routes imports
const albumRoute = require('./routes/albums')
app.use('/v1/api/albums', albumRoute)

// Song Routes imports
const songRoute = require('./routes/song')
app.use('/v1/api/songs', songRoute)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(4000, () => console.log('listening on http://localhost:4000'))
