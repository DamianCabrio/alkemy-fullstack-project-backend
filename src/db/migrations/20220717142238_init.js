/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('transaction', function (table) {
    table.increments('id').primary();
    table.string('description').notNullable().checkLength('>=', 1).checkLength('<=', 255);
    table.float('amount').notNullable().checkPositive();
    table.enu('type', ['0', '1']).notNullable();
    table.date('date').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('transaction');
};
