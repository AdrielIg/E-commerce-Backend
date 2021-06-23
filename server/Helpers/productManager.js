class Product {
  constructor({ name, description, price, img, stock, code, id }) {
    this.name = name
    this.description = description
    this.price = price
    this.img = img
    this.stock = stock
    this.code = code
    this.id = id
    this.timestamp = new Date.now()
  }
}

class ProductManager {
  constructor() {
    this.products = []
  }

  getProducts() {
    return this.products
  }

  getProduct(id) {
    return this.products.find(product => product.id == id)
  }

  addProduct(product) {
    const newProduct = { ...product, id: this.products[this.products.length - 1].id + 1 }
  }

  updateProduct(productReceived, idSearched) {
    const indexOfProduct = this.products.findIndex(product => product.id == idSearched)
    if (indexOfProduct == 1) {
      return false
    }
    else {
      const updatedProduct = {
        id: idSearched,
        timestamp: new Date().toLocaleString(),
        ...productReceived,
      }
      this.products[indexOfProduct] = updatedProduct
      return updatedProduct
    }

  }
  deleteProduct(idSearched) {
    const indexOfProduct = this.products.findIndex(product => product.id == idSearched)
    if (indexOfProduct == 1) {
      return false
    }
    else {
      return this.products.splice(indexOfProduct, 1)

    }

  }

}

export default ProductManager