
const express = require('express')
//import productsRoutes
const routerProducts = require('./routes/products').routerProducts


//import cartRoutes
const routerCart = require('./routes/cart')


const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/productos', routerProducts);
app.use('/carrito', routerCart);


const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`Server inicializado en el puerto: ${PORT}`)
})

server.on('error', () => {
  console.log('Error del servidor.');
})