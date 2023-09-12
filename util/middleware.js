const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')
const { Blog } = require('../models')

const errorHandler = (error, request, response, next) => {
  console.error(error.errors[0])

  if (error.errors[0].path === 'username') {
    return response.status(400).send({ error: 'Username missing or not an email!' })
  }
  if (error.errors[0].path === 'year') {
    return response.status(400).send({ error: 'Year must be between 1991 - present!' })
  }
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

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  blogFinder,
  tokenExtractor
}