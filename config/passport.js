const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const dbConfig = require('./db')
const User = require('../models/user')

const passportConfig = (passport) => {
  const opts = {}

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = dbConfig.secret

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false)
      }

      if (user) {
        return done(null, user)
      }

      return done(null, false)
      // or you could create a new account
    })
  }))
}

module.exports = passportConfig
