const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'you are welcome to auth page' })
})

module.exports = router
