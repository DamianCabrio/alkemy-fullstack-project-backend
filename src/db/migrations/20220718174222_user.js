/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary();
    table
      .string('name')
      .notNullable()
      .checkLength('>=', 1)
      .checkLength('<=', 255);
    table
      .string('surname')
      .notNullable()
      .checkLength('>=', 1)
      .checkLength('<=', 255);
    table.string('email').notNullable().unique();
    table.string('password').notNullable().checkLength(">=",8);
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('user');
};
