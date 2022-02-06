const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'you are welcome to user page' })
})

//Update User
//Delete User
//Get a User
//Follow a User
//Unfollow a User
module.exports = router
