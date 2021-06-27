class Product {
  constructor({ name, description, price, img, stock, code, id }) {
    this.name = name
    this.description = description
    this.price = price
    this.img = img
    this.stock = stock
    this.code = code
    this.id = id
    this.timestamp = Date.now()
  }
}

class ProductManager {
  constructor() {
    this.products = []
  }

  getProducts() {
    const products = this.products
    return products ? products : { error: 'There is not products' }
  }

  getProduct(id) {
    const product = this.products.find(product => product.id == id)
    return product || { error: `producto con id ${id} no encontrado` }
  }

  addProduct(product) {
    let newProduct;
    if (this.products.length === 0) {
      newProduct = new Product({ ...product, id: 1 })
    }
    else {
      newProduct = new Product({ ...product, id: this.products[this.products.length - 1].id + 1 })
    }

    this.products.push(newProduct)
    return newProduct

  }

  updateProduct(productReceived, idBuscado) {
    const indexOfProduct = this.products.findIndex(product => product.id == idBuscado)
    if (indexOfProduct == -1) {
      return false
    }
    else {
      const updatedProduct = {

        ...productReceived,
        id: idBuscado,
        timestamp: Date.now(),
      }
      this.products[indexOfProduct] = updatedProduct
      return updatedProduct
    }

  }
  deleteProduct(idBuscado) {
    const indexOfProduct = this.products.findIndex(product => product.id == idBuscado)
    if (indexOfProduct == -1) {
      return false
    }
    else {
      return this.products.splice(indexOfProduct, 1)

    }

  }

}

module.exports = ProductManager