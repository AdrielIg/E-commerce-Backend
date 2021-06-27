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
    const products = this.products
    return products ? products : { error: 'There is not products' }
  }

  getProduct(id) {
    const product = this.products.find(product => product.id == id)
    return product || { error: `producto con id ${id} no encontrado` }
  }

  addProduct(product) {
    const newProduct = new CartItem({ ...product, id: this.products[this.products.length - 1].id + 1 })

    return this.products.push(newProduct)

  }

  updateProduct(productReceived, idBuscado) {
    const indexOfProduct = this.products.findIndex(product => product.id == idBuscado)
    if (indexOfProduct == -1) {
      return false
    }
    else {
      const updatedProduct = {
        id: idBuscado,
        timestamp: new Date().toLocaleString(),
        ...productReceived,
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

export default ProductManager