const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv')
const UserRoute = require('./routes/users')

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log(err)
  })

//Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'Welcome to homepage' })
})

app.get('/users', (req, res) => {
  return res.status(200).json({ msg: 'Welcome to user page' })
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!')
})
