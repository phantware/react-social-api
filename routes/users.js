const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'you are welcome to user page' })
})

//Update User
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      return res.status(200).json({ msg: 'Account has been updated' })
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json({ msg: 'You can update only your account!' })
  }
})
//Delete User
//Get a User
//Follow a User
//Unfollow a User
module.exports = router
