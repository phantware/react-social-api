const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

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
    console.log(error)
  }
})

module.exports = router
