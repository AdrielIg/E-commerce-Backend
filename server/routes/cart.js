const express = require('express')

const routerCart = express.Router()

const factory = require('../Factory/factory')

const Persistencia = factory.getPersistencia('mongo')
const instancia = new Persistencia()

//Get all cart items
routerCart.get('/listar', async (req, res) => {
  try {
    const products = await instancia.getCarts()
    res.status(200).json(products)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)

  }
})

//get cart item by id
routerCart.get('/listar/:id', async (req, res) => {
  try {
    const product = await instancia.getCart(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})




//add a product to the cart
routerCart.post('/agregar/:id', async (req, res) => {
  try {

    const product = await instancia.addCart(req.params.id)

    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

//delete product of the cart
routerCart.delete('/borrar/:id', async (req, res) => {
  try {
    const product = await instancia.deleteCart(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})


module.exports = routerCart