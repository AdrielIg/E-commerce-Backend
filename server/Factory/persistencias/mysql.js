const options = require('../../Config/sql_config')
const knex = require('knex')(options)

knex.schema.hasTable('products').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('title', 100);
      table.string('description', 200);
      table.float('price');
      table.string('img', 250);
      table.integer('stock');
      table.integer('code');
      table.timestamps();
    }).catch((err) => { console.log(err); throw err }).finally(console.log('tabla creada'))
  }
});

knex.schema.hasTable('cart').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('cart', (table) => {
      table.increments('id').primary();
      table.string('name', 100);
      table.string('description', 200);
      table.float('price');
      table.string('img', 250);
      table.integer('stock');
      table.integer('code');
      table.timestamps();
    }).catch((err) => { console.log(err); throw err }).finally(console.log('tabla creada'))
  }
});

class Mysql {
  constructor() { }



}