const router = require('express').Router()

router.post('/', async (req, res) => {
  res.json({
    status: 'ok',
  })
})

module.exports = router
