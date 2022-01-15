const { parseToken } = require('../utils/auth')
const {
  User,
} = require('../models')

module.exports.getUserFromAccessToken = async (req) => {
  try {
    const token = req.get('x-access-token')
    if (
      typeof token === 'undefined' ||
      token === null ||
      !token
    ) return null

    const payload = await parseToken(token)
    if (!payload) return null

    const user = await User.findOne({
      where: {
        id: payload.sub,
        status: 'active',
      },
    })
    return user
  } catch (e) {
    return null
  }
}

module.exports.userAuth = async (req, res, next) => {
  try {
    const token = req.get('x-access-token')
    if (
      typeof token === 'undefined' ||
      token === null
    ) throw new Error('000401')

    const user = await this.getUserFromAccessToken(req)
    if (!user || !user.id) throw new Error('000401')

    req.currentUser = user.display()

    next()
  } catch (e) {
    console.log(e)
    next(e)
  }
}
