
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
/* require('./lib/passportConfig')(passport) */

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

/* PASSPORT DECLARATION */
passport.use('login', new LocalStrategy({
  passReqToCallback: true
},
  function (req, email, password, done) {
    /* Buscando nombre en base de datos */
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err)
      }
      /* Si el usuario no existe */
      if (!user) {
        console.log('El usuario no existe rey: ' + email)
        return done(null, false, console.log('message', 'Usario no encontrado'))
      }
      /* Si el usuario existe pero la pass es erronea */
      if (!isValidPassword(user, password)) {
        console.log('Contrasenia erronea')
        return done(null, false, console.log('message', 'Contrasenia erronea pa'))
      }
      return done(null, user)
    })
  }))

/* Compara hash */
const isValidPassword = (user, password) => {
  console.log('error')
  return bCrypt.compareSync(password, user.paswword)
}

passport.use('signup', new LocalStrategy({
  passReqToCallback: true
},
  function (req, username, password, done) {
    console.log('req:', req)
    console.log('pass:', password)
    console.log('email:', username)
    findOrCreateUser = function () {
      User.findOne({ email: username }, async function (err, user) {
        /* En caso de error */
        if (err) {
          console.log('Error registrandose', err)
          return done(err)
        }
        /* Si ya existe el usuario */
        if (user) {
          console.log('Ese usuario ya existe rey')
          return done(null, false, console.log('message', 'Este usuario ya existe '));
        } else {
          /* creamos nuevo usuario */
          let newUser = new User()
          newUser.email = username
          newUser.password = await createHash(password)
          /* guardamos usuario */
          newUser.save(function (err) {
            if (err) {
              console.log('Hubo un error en guardar user: ' + err)
              throw err
            }
            console.log('user registado')
            return done(null, newUser)
          })
        }
      })
    }
  }))

const createHash = function (password) {
  console.log('error')
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser(function (user, done) {
  console.log('error')
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log('error')
  done(null, user);
});

app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/signup', (req, res) => {
  res.render('register')
})

app.get('/error', (req, res) => {
  res.render('error')
})

app.get('/yes', (req, res) => {
  res.render('yes')
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/error' }), async (req, res) => {
  try {
    res.redirect('/yes')
    return

  }
  catch (err) {
    console.log(err)
  }
})


app.post('/signup', passport.authenticate('signup', { failureRedirect: '/error' }), (req, res) => {
  res.redirect('/login')
})



/* Route Login  */
/* app.post('/login', (req, res, next) => {
  console.log('El body', req.body)
  passport.authenticate('local', (err, user, info) => {
    console.log('user reyt', user)
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

}) */



const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`Server inicializado en el puerto: ${PORT}`)
})

server.on('error', () => {
  console.log('Error del servidor.');
})