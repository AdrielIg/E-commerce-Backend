const express = require('express')
//import cartmanager
const CartManager = require('../Controllers/cartManager')
const cartManager = new CartManager()

//Importar Product manager desde productos.js
const products = require('../routes/products')
const productManager = products.productManager
const routerCart = express.Router()


//Get all cart items
routerCart.get('/listar', (req, res) => {
  try {
    const products = cartManager.getProducts()
    res.status(200).json(products)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)

  }
})

//get cart item by id
routerCart.get('/listar/:id', (req, res) => {
  try {
    const product = cartManager.getProduct(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})




//add a product to the cart
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

//delete product of the cart
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