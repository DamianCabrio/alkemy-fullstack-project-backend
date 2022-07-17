import '../helpers/loadEnv.js'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
console.log('DB_HOST:', DB_HOST);
console.log('DB_USER:', DB_USER);
console.log('DB_PASSWORD:', DB_PASSWORD);
console.log('DB_DATABASE:', DB_DATABASE);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
