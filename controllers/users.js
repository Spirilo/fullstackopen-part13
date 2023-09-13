const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'markedBlogs',
        through: {
          attributes: []
        }
      }
    ]
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read === 'true') {
    where.read = true
  }
  if (req.query.read === 'false') {
    where.read = false
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'markedBlogs',
      through: {
        attributes: []
      },
      include: {
        model: ReadingList,
        where,
        attributes: ['read', 'id']
      }
    }
  })
  await user.addProfile
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  return res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  user.name = req.body.name
  await user.save()
  res.json(user)
})

module.exports = router