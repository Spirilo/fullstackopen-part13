const { Blog } = require('../models')
const { sequelize } = require('../util/db')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const authorData = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [['likes', 'DESC']],
    group: 'author'
  })
  res.json(authorData)
})

module.exports = router