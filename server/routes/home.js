const express = require('express')
const User = require('../models/User')
const routerHome = express.Router()

routerHome.get('/', (req, res) => {
  console.log(req.user)
  if (req.isAuthenticated()) {
    res.sendFile('index.html', { root: __dirname + '../../../public/' })

  }
  else {
    res.redirect('/login')
  }
})

routerHome.get('/cart', async (req, res) => {
  console.log(req.user)
  if (req.isAuthenticated()) {
    res.sendFile('cart.html', { root: __dirname + '../../../public/' })

  }
  else {
    res.redirect('/login')
  }

})

module.exports = routerHome