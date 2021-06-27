class CartItem {
  constructor(product, id, timestamp) {
    this.product = product
    this.id = Date.now()
    this.timestamp = Date.now()
  }
}

class CartManager {
  constructor() {
    this.cartProducts = []
  }

  getProducts() {
    return this.cartProducts
  }

  getProduct(id) {
    return this.cartProducts.find(product => product.id == id)
  }

  addProductCart(product) {
    const cartItem = new CartItem(product)
    this.cartProducts.push(cartItem)
    return cartItem
  }
  deleteProduct(idSearched) {
    const indexOfProduct = this.cartProducts.findIndex(product => product.id == idSearched)
    if (indexOfProduct == 1) {
      return false
    }
    else {
      return this.cartProducts.splice(indexOfProduct, 1)

    }

  }
}

module.exports = CartManager