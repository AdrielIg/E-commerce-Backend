const express = require('express')
const CartManager = require('../Controllers/cartManager')
const { isAdmin } = require('../auth/auth')
const cartManager = new CartManager()

const routerCart = express.Router()

routerCart.get('/listar', (req, res) => {
  json
})

export default routerCart