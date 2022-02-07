const router = require('express').Router()
const Post = require('../models/Post')

//create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savePost = await newPost.save()
    return res.status(200).json(savePost)
  } catch (error) {
    return res.status(500).json({ msg: error })
  }
})

//update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      return res
        .status(200)
        .json({ msg: 'The post has been updated successfully' })
    } else {
      res.status(400).json({ msg: 'You can update only your post' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
})
//delete a post
//like a post
//get a post
// get timeline posts
module.exports = router
