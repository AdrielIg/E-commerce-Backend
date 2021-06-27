const express = require('express')
const ProductManager = require('../Controllers/productManager')

const productManager = new ProductManager()

const routerProducts = express.Router()

const admin = true


const isAdmin = (req, res, next) => {
  if (!admin) {
    res.json({ error: -1, description: `Ruta ${req.route.path}, metodo ${req.method} no autorizado` })
  }
  else {
    next()
  }
}
//GET ALL THE PRODUCTS
routerProducts.get('/listar', (req, res) => {
  try {
    const products = productManager.getProducts()
    res.status(200).json(products)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)

  }
})

//GET PRODUCT BY ID
routerProducts.get('/listar/:id', (req, res) => {
  try {
    const product = productManager.getProduct(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

//ADD A PRODUCT
routerProducts.post('/agregar', isAdmin, (req, res) => {
  try {

    //In case of validating input
    /* const { name, description, price, img, stock, code } = req.body */

    const product = productManager.addProduct(req.body)

    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

//UPDATE A PRODUCT
routerProducts.put('/actualizar/:id', isAdmin, (req, res) => {
  try {
    const product = productManager.updateProduct(req.body, req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

//DELETE PRODUCT
routerProducts.delete('/borrar/:id', isAdmin, (req, res) => {
  try {
    const product = productManager.deleteProduct(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})


module.exports = { routerProducts, productManager }

