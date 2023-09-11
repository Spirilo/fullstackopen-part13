const router = require('express').Router()

const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  return res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  if(!req.body.likes) {
    return res.status(404).json({ error: 'No likes in body!'})
  }
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

module.exports = router