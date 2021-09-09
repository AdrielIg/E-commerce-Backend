const mongoose = require('mongoose')
const user = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  adress: String,
  age: Number,
  phone: String,
  avatar: String,
  cart: Array

})

module.exports = mongoose.model('User', user)