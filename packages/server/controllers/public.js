const router = require('express').Router()

router.get('/time', async (req, res) => {
  res.end((new Date()).toString())
})

router.get('/hello/:name', async (req, res) => {
  const capitalise = text => `${text[0].toUpperCase()}${text.slice(1)}`
  res.end(`Hello, ${capitalise(req.params.name)}!`)
})

module.exports = router
