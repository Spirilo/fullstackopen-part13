const router = require('express').Router()

const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const reading = await ReadingList.create(req.body)
  return res.json(reading)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)
  console.log(readingList)

  if(readingList) {
    if (req.decodedToken.id === readingList.userId) {
      readingList.read = req.body.read
      await readingList.save()
      res.json(readingList)
    }
    return res.status(400).json({ error: 'Must be logged in to alter reading list!' })
  }
  return res.status(400).json({ error: 'No reading list with that id!'})
})

module.exports = router