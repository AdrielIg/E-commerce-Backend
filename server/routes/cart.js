const express = require('express')
const CartManager = require('../Controllers/cartManager')
const cartManager = new CartManager()
//Importar Product manager
const routerCart = express.Router()

const admin = false


const isAdmin = (req, res, next) => {
  if (!admin) {
    res.json({ error: -1, description: `Ruta ${req.route.path}, metodo ${req.method} no autorizado` })
  }
  else {
    next()
  }
}

routerCart.get('/listar', (req, res) => {
  try {
    const products = cartManager.getProducts()
    res.status(200).json(products)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)

  }
})

routerCart.get('/listar/:id', (req, res) => {
  try {
    const product = cartManager.getProduct(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})



//Aniadir el product que esta cargado en la clase de productManger de products.js

routerCart.post('/agregar/:id', (req, res) => {
  try {
    const searchedProduct = productManager.getProduct(req.params.id)
    const product = cartManager.addProductCart(searchedProduct)

    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

routerCart.delete('/borrar/:id', (req, res) => {
  try {
    const product = cartManager.deleteProduct(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})


module.exports = routerCart