import Knex from "knex"

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('description').notNullable()
    table.string('thumbnail').notNullable()
    table.string('category').notNullable()
    table.string('website').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('products')
}

