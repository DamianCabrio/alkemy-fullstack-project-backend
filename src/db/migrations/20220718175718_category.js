/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('category', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable().checkLength('>=', 1).checkLength('<=', 255);
    table.timestamps(true, true);
  }).then(() => {
    return knex
      .table('category')
      .insert([
        { name: 'Comida' },
        { name: 'Ropa' },
        { name: 'Transporte' },
        { name: 'Entretenimiento' },
        { name: 'Otros' },
      ]);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('category');
};
