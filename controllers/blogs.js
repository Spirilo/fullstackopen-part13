const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor } = require('../util/middleware')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.substring]: req.query.search
        }
      },
      {
        author: {
          [Op.substring]: req.query.search
        } 
      }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name', 'username']
    },
    where,
    order: [['likes', 'DESC']]
  })
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

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (req.blog) {
    if (req.blog.userId === user.id) {
      await req.blog.destroy()
    } else {
      res.status(404).json({ error: 'Login to blog owner to delete blog!'})
    }
  }
  res.status(204).end()
})

module.exports = router