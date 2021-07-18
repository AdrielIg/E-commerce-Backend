const mongoose = require('mongoose')



const schema_prod = mongoose.Schema({
  title: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 200 },
  price: { type: Number, require: true },
  img: { type: String, require: true, max: 250 },
  stock: { type: Number, require: true },
  code: { type: Number, require: true },
  timestamp: { type: Date, default: new Date() },

});

const schema_cart = mongoose.Schema({
  timestamp: { type: Date, default: new Date() },
  cart: {
    title: String,
    description: String,
    price: Number,
    img: String,
    stock: Number,
    code: Number,
    timestamp: String,
    _id: String
  }

});




/* SCHEMAS */
const Productos = mongoose.model('products', schema_prod)

const Cart = mongoose.model('carts', schema_cart)

class Mongo {
  constructor() { }
  //Connect database
  async connectDB() {
    const MONGO_URL = require('../../Config/config.json').MONGO_URL
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('conexion a la base de datos realizada!');
  }


  /* Products methods */
  async getProducts() {
    try {
      const products = await Productos.find({});
      return products
    } catch (err) {
      console.log(err)
    }

  }

  async getProduct(id) {
    try {
      const product = await Productos.findById(id)
      return product
    } catch (err) {
      console.error(err)
    }
  }

  async addProduct({ title = '-', description = '-', price = 0, img = '-', stock = '-', code = 0 }) {
    try {
      const product = { title, description, price, img, stock, code };

      const newProduct = await Productos.create({ ...product })
      return newProduct

    } catch (err) {
      console.error(err)

    }

  }

  async updateProduct(id, data) {
    try {
      const { _id, title, description, price, img, stock, code } = await Productos.findById(id)
      const updated = await Productos.updateOne({ _id: id }, { $set: { title: data.title || title, description: data.description || description, price: data.price || price, img: data.img || img, stock: data.stock || stock, code: data.code || code } })

      return updated
    } catch (err) {
      console.error(err)
    }

  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Productos.deleteOne({ _id: id })
      return deletedProduct
    } catch (err) {
      console.error(err)
    }


  }

  /* CartItems */

  async getCarts() {
    try {
      const products = await Cart.find({});
      return products
    } catch (err) {
      console.log(err)
    }
  }

  async getCart(id) {
    try {
      const product = await Cart.findById(id)
      return product
    } catch (err) {
      console.error(err)
    }
  }

  async addCart(id) {
    try {
      const product = await this.getProduct(id);
      const { timestamp, _id, title, description, price, img, stock, code } = product
      const productToAdd = { timestamp: timestamp, _id: _id, title: title, description: description, price: price, img: img, stock: stock, code: code }
      console.log(product)
      const newCart = await Cart.create({ cart: { ...productToAdd } })

      return newCart
    } catch (err) {
      console.error(err)

    }

  }

  async deleteCart(id) {
    try {
      const deletedCart = await Cart.deleteOne({ _id: id })
      return deletedCart
    } catch (err) {
      console.error(err)
    }
  }

}

module.exports = Mongo;