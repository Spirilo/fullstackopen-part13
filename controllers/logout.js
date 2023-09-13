const router = require('express').Router()

const Session = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  console.log(req.decodedToken.id)
  await Session.destroy({
    where: { userId: req.decodedToken.id }
  })

  res.json({ info: 'Logged out'})
})

module.exports = router