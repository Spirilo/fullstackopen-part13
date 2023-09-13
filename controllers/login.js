const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.get('/', async (req, res) => {
  const all = await Session.findAll()
  res.json(all)
})

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  console.log(user)
  if (user.disabled) {
    return res.status(400).json({
      error: 'User is disabled, contact admin!'
    })
  }

  const passwordCorrect = req.body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password!'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }
  console.log(user)

  const token = jwt.sign(userForToken, SECRET)
  await Session.create({ token, userId: user.id })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router