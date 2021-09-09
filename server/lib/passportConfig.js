const User = require('../models/User')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy

module.exports = function (passport) {

  passport.use(
    new localStrategy({ passReqToCallback: true }, (email, password, done) => {
      console.log('skere')
      User.findOne({ email: email }, async (err, user) => {
        if (err) throw err
        if (!user) {

          return done(null, false)
        }

        await bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err
          if (result === true) {
            return done(null, user)
          }
          else {
            /* Si no son la misma contrasenia */
            return done(null, false)
          }
        })
      })
    })
  )




  passport.serializeUser((user, cb) => {

    cb(null, user.id)
  })
  passport.deserializeUser((id, cb) => {

    User.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        name: user.name,
        cart: user.cart
      }
      cb(err, user)
    })
  })

}