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

routerAuth.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {

    if (err) throw err
    if (!user) res.send('User not exist')
    else {
      req.logIn(user, err => {
        if (err) throw err

      })
      res.redirect('/')
    }
  })(req, res, next)

  console.log('Login', req.body)

})

routerAuth.get('/login', async (req, res) => {
  const pepe = await User.findOne({ email: 'test' })
  console.log(pepe)
  res.render('login')
})



routerAuth.get('/logout', async (req, res) => {
  req.logOut()
  res.redirect('/login')
})

routerAuth.get('/user', async (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user)
  }
  else {
    res.send('There is no user')
  }
})


module.exports = routerAuth