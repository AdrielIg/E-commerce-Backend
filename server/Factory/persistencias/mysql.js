const options = require('../../Config/sql_config')
const knex = require('knex')(options)



class Mysql {
  constructor() { }

  async connectDB() {
    await knex.schema.hasTable('products').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('products', (table) => {
          table.increments('id').primary();
          table.string('title', 100);
          table.string('description', 200);
          table.float('price');
          table.string('img', 250);
          table.integer('stock');
          table.integer('code');
          table.timestamp('fecha', { useTz: true }).notNullable().defaultTo(knex.fn.now());
        }).catch((err) => { console.log(err); throw err }).finally(console.log('tabla creada'))
      }
    });


    await knex.schema.hasTable('carts').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('carts', (table) => {
          table.increments('id').primary();
          table.string('name', 100);
          table.integer('products_id').unsigned();
          table.foreign('products_id')
            .references('id')
            .inTable('products')
          table.timestamp('fecha', { useTz: true }).notNullable().defaultTo(knex.fn.now());
        }).catch((err) => { console.log(err); throw err }).finally(console.log('tabla creada'))
      }
    });
  }

  async getProducts() {
    try {
      const products = await knex.select().table('products');
      return products
    } catch (err) {
      console.log(err)
    }
  }
  async getProduct(id) {
    try {
      const product = await knex('products').where({ id: id });
      return product[0] // El primer (y unico) elemento del array de objetos
    } catch (err) {
      console.error(err)
    }
  }

  async addProduct(data) {
    try {
      const newProduct = { title: data.title, description: data.description, price: data.price, img: data.img, stock: data.stock, code: data.code }
      const id = await knex('products').insert(newProduct);
      if (id) {
        return {
          ...newProduct,
          id
        };
      } else {
        return
      }
    } catch (err) {
      console.error(err);
    }
  }

  async updateProduct(id, data) {
    try {
      const { title, description, price, img, stock, code } = await this.getProduct(id)

      const newProduct = { title: data.title || title, description: data.description || description, price: data.price || price, img: data.img || img, stock: data.stock || stock, code: data.code || code };
      if (
        await knex('products')
          .where('id', id)
          .update({ ...newProduct })
      ) {
        return {
          ...newProduct,
          id
        };
      } else {
        return
      }
    } catch (err) {
      console.error(err);

    }
  }

  async deleteProduct(id) {

    try {

      const deletedProduct = await knex('products').where({ id: id });
      if (await knex('products').where({ id: id }).del()) {
        return deletedProduct;
      } else {
        return { error: 'No hay producto para borrar' }
      }
    } catch (err) {
      console.error(err);

    }
  }

  /* CARRITO METHODS */
  async getCarts() {
    try {
      const carts = await knex.select().table('carts');
      return carts
    } catch (err) {
      console.log(err)
    }
  }
  async getCart(id) {
    try {

      const cart = await knex('carts').where({ id: id });
      return cart[0] // El primer (y unico) elemento del array de objetos
    } catch (err) {
      console.error(err)
    }
  }

  async addCart(id) {
    try {
      const product = await this.getProduct(id)
      console.log(product)
      const newCart = { name: "carrito1", products_id: product.id }
      const cartId = await knex('carts').insert(newCart);
      return {
        ...newCart,
        cartId
      }

    } catch (err) {
      console.error(err);
    }
  }
  async deleteCart(id) {

    try {

      const deletedCart = await knex('carts').where({ id: id });
      if (await knex('carts').where({ id: id }).del()) {
        return deletedCart;
      } else {
        return { error: 'No hay producto para borrar' }
      }
    } catch (err) {
      console.error(err);

    }
  }

}



module.exports = Mysql