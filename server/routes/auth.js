const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const routerAuth = express.Router()

/* Register */
routerAuth.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err
    if (doc) res.send('User already exist')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        ...req.body, password: hashedPassword
      })
      await newUser.save()
      res.render('login')
    }
  })
  console.log('Usuario registrado!!!:', req.body)
})

routerAuth.get('/register', (req, res) => {

  res.render('register')
})

/* Log In */

/* routerAuth.post('/login', async (req, res, next) => {

  await passport.authenticate('local', (err, user, info) => {
    console.log('user reyt', info)
    if (err) throw err
    if (!user) res.send('User not exist')
    else {
      req.logIn(user, err => {
        if (err) throw err
        res.send({ message: 'User Log In successfully!', user: req.user.email, data: req.user })
      })
    }
  })(req, res, next)

  console.log('Login', req.body)

})*/

routerAuth.get('/login', async (req, res) => {
  const pepe = await User.findOne({ email: 'test' })
  console.log(pepe)
  res.render('login')
})

routerAuth.get('/skere', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('logueado rey')
    console.log(req.user)
  }
  else {
    console.log('no logueado rey')
  }
})


module.exports = routerAuth