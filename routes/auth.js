const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { Mongoose } = require('mongoose')

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'you are welcome to auth page' })
})

router.post('/register', async (req, res) => {
  try {
    //Generate new password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // create new user

    let { username, email, password } = req.body
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    })

    // save users and return response

    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})

//Login

router.post('/login', async (req, res) => {
  try {
    //Accept user login data
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    //compare user login password

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(400).json({ msg: 'Wrong password' })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
