const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'you are welcome to auth page' })
})

router.post('/register', async (req, res) => {
  let { username, email, password } = req.body
  const newUser = new User({
    username,
    email,
    password,
  })
  try {
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
