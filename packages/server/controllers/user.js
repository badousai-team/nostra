const router = require('express').Router()
const Yup = require('yup')

const {
  User,
} = require('../models')

router.patch('/username', async (req, res) => {
  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Please enter a username more than 3 character')
      .max(24, 'Please enter a username less than 24 character')
      .matches(/^\w+$/, 'Please enter only alphabets or numbers')
      .required('This field is required'),
  })

  await schema.validate(req.body)

  const { username } = req.body

  const newUsername = username.trim()

  if (newUsername === req.currentUser.username) {
    // do nothing
    res.json(req.currentUser)
    return
  }

  // check if username is already inuse
  const existingUserCount = await User.count({
    where: { username: newUsername },
  })
  if (existingUserCount > 0) {
    throw new Error('This username is already inuse, please enter a unique username')
  }

  const user = await User.findOne({
    where: {
      id: req.currentUser.id,
    },
  })
  if (!user || !user.id) throw new Error('000404')

  user.username = newUsername
  await user.save()

  res.json(user.display())
})

router.patch('/profile', async (req, res) => {
  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Please enter a username more than 3 character')
      .max(24, 'Please enter a username less than 24 character')
      .matches(/^\w+$/, 'Please enter only alphabets or numbers')
      .required('This field is required'),
    profileUrl: Yup.string(),
  })

  await schema.validate(req.body)

  const user = await User.findOne({
    where: {
      id: req.currentUser.id,
    },
  })
  if (!user || !user.id) throw new Error('000404')

  const { username, profileUrl } = req.body

  const newUsername = username.trim()

  if (
    user.username === newUsername &&
    user.profileUrl === profileUrl
  ) {
    // if all data the same, skip update
    res.json(user.display())
    return
  }

  if (newUsername !== req.currentUser.username) {
    // check if username is already inuse
    const existingUserCount = await User.count({
      where: { username: newUsername },
    })
    if (existingUserCount > 0) {
      throw new Error('This username is already inuse, please enter a unique username')
    }
    user.username = newUsername
  }

  user.profileUrl = profileUrl || null
  await user.save()

  res.json(user.display())
})

module.exports = router
