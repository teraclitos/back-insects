const jwt = require('jsonwebtoken')
const tokenValidation = (roleAuth) => async (req, res, next) => {
  try {
    let tokenValue = ''

    if (req.header('authorization') && req.header('authorization').toLowerCase().startsWith('bearer')) {
      tokenValue = req.header('authorization').split(' ')[1]
    }

    const verify = tokenValue && jwt.verify(tokenValue, process.env.JWT_SECRET)

    if (!tokenValue || !verify.id) { return res.status(401).json({ error: true, msg: 'token missing or invalid' }) }
    const { role, id } = verify

    if (role !== roleAuth) {
      return res.status(401).json({ error: true, msg: 'you have no authorization' })
    }

    res.locals.id = id
    next()
  } catch (error) {
    res.status(500).json({ error: true, msg: error.message })
  }
}
module.exports = tokenValidation
