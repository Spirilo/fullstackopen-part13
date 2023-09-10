const { Blog } = require('../models')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'Missing url and/or title!' })
  }
  if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'Cannot find blog with id!' })
  }

  next(error)
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

module.exports = {
  errorHandler,
  blogFinder
}