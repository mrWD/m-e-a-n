const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const dbConfig = require('../config/db')

const User = require('../models/user')

const router = express.Router()

router.post('/reg', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
  })

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, message: 'User wasn\'t created' })
    } else {
      res.json({ success: false, message: 'User was created' })
    }
  })
})

router.post('/auth', (req, res) => {
  const login = req.body.login
  const password = req.body.password

  User.getUserByLogin(login, (err, user) => {
    if (err) {
      throw err
    }

    if (!user) {
      return res.json({ success: false, message: 'User wasn\'t found' })
    }

    User.comparePasswords(password, user.password, (err, isMatch) => {
      if (err) {
        throw err
      }

      if (!isMatch) {
        return res.json({ success: false, message: 'Passwords don\'t match' })
      }

      const HOUR = 3600
      const DAY = 24

      const token = jwt.sign(user.toJSON(), dbConfig.secret, {
        expiresIn: HOUR * DAY,
      })

      res.json({
        success: true,
        token: `JWT ${token}`,
        user: {
          id: user._id,
          login: user.login,
          name: user.name,
          email: user.email,
        }
      })
    })
  })
})

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('The Dahboard page.')
})

module.exports = router
