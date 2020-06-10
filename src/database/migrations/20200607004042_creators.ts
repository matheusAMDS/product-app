import Knex from "knex"

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('creators', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('creators')
}

