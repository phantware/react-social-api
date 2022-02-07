const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

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
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      return res
        .status(200)
        .json({ msg: 'The post has been deleted successfully' })
    } else {
      res.status(400).json({ msg: 'You can delete only your post' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
})

//like / dislike a post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      return res.status(200).json({ msg: 'The post has been liked' })
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      return res.status(200).json({ msg: 'The post has been disliked' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
})

//get a post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: currentUser._id })
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
