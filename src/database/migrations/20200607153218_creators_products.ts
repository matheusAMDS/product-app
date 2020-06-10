import Knex from "knex"

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('creators_products', table => {
    table.increments('id').primary()
    table
      .integer('creator_id')
      .notNullable()
      .references('id')
      .inTable('creators')
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('creators_products')
}

