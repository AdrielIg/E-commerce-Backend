
const express = require('express')
const path = require("path");
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt')
const User = require('./models/User')
const hanldebars = require('express-handlebars')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
//import productsRoutes
const routerProducts = require('./routes/products')
/* import auth routes */
const routerAuth = require('./routes/auth')

//import cartRoutes
const routerCart = require('./routes/cart')

/* ENV */
dotenv.config();

const PORT = process.env.PORT || 8080

const app = express()

//Connect database
async function connectDB() {
  await mongoose.connect(process.env.MONGO_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('conexion a la base de datos realizada!');
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));
app.use(cookieParser('secret'))
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS,
    mongoOptions: advancedOptions
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 10 * 60 * 60,
  }


}))
app.use(passport.initialize())
app.use(passport.session())
require('./lib/passportConfig')(passport)

//Handlebars
app.engine(
  'hbs',
  hanldebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'

  })
)

//Motor de plantilla
app.set('view engine', 'hbs')
//Ubicacion de plantillas
app.set('views', './views')

app.use('/productos', routerProducts);
app.use('/carrito', routerCart);
app.use(routerAuth);





/* Route Login  */
app.post('/login', (req, res, next) => {
  console.log('El body', req.body)
  passport.authenticate('local', (err, user, info) => {
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

})



const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`Server inicializado en el puerto: ${PORT}`)
})

server.on('error', () => {
  console.log('Error del servidor.');
})