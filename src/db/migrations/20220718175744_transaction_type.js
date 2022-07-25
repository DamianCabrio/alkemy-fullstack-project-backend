/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema
    .createTable('transaction_type', function (table) {
      table.increments('id').primary();
      table
        .string('name')
        .notNullable()
        .checkLength('>=', 1)
        .checkLength('<=', 255);
      table.timestamps(true, true);
    })
    .then(() => {
      return knex
        .table('transaction_type')
        .insert([{ name: 'Ingreso' }, { name: 'Egreso' }]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('transaction_type');
};
