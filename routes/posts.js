const router = require('express').Router()
const Post = require('../models/Post')

//create a post

//update a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savePost = await newPost.save()
    return res.status(200).json(savePost)
  } catch (error) {
    return res.status(500).json({ msg: error })
  }
})
//delete a post
//like a post
//get a post
// get timeline posts
module.exports = router
