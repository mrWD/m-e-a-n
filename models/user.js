const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const config = require('../config/db')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserByLogin = (login, callback) => {
  const query = { login }
  User.findOne(query, callback)
}

module.comparePasswords = (password1, password2, callback) => {
  bcrypt.compare(password1, password2, (err, isMatch) => {
    if (err) {
      throw err
    }

    callback(null, isMatch)
  })
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback)
}

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err
      }

      newUser.password = hash

      newUser.save(callback())
    })
  })
}
