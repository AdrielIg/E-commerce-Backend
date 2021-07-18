const express = require('express')


const routerProducts = express.Router()

/* import Factory */
const factory = require('../Factory/factory')
/* const Persistencia = new factory(); */

const Persistencia = factory.getPersistencia('mongo')
const instancia = new Persistencia()
instancia.connectDB()



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
routerProducts.get('/listar', async (req, res) => {
  try {
    const products = await instancia.getProducts()
    res.status(200).json(products)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)

  }
})

//GET PRODUCT BY ID
routerProducts.get('/listar/:id', async (req, res) => {
  try {
    const product = await instancia.getProduct(req.params.id)
    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

//ADD A PRODUCT
routerProducts.post('/agregar', isAdmin, async (req, res) => {
  try {

    //In case of validating input
    /* const { name, description, price, img, stock, code } = req.body */

    const product = await instancia.addProduct(req.body)


    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

//UPDATE A PRODUCT
routerProducts.put('/actualizar/:id', isAdmin, async (req, res) => {
  try {
    const product = await instancia.updateProduct(req.params.id, req.body)

    res.status(200).json(product)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})

//DELETE PRODUCT
routerProducts.delete('/borrar/:id', isAdmin, async (req, res) => {
  try {
    const productDeleted = await instancia.deleteProduct(req.params.id)

    res.status(200).json(productDeleted)
  }
  catch (err) {
    console.log(`Ha ocurrido un error: ${err}`)
  }
})


module.exports = routerProducts

