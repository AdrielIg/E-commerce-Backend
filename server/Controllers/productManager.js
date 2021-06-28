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
    return products.length > 0 ? products : { error: 'There is not products' }
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
    const product = this.products.find(prod => prod.id == idBuscado)
    //In case of not updating a value , use the previous one
    //keeping the same id and timestamp
    product.name = productReceived.name || product.name
    product.description = productReceived.description || product.description
    product.price = productReceived.price || product.price
    product.img = productReceived.img || product.img
    product.stock = productReceived.stock || product.stock
    product.code = productReceived.code || product.code
    return product


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