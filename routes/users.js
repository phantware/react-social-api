const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'you are welcome to user page' })
})

module.exports = router
