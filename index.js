const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const dovent = require('dotenv').config()

const PORT = 8080

app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`))
