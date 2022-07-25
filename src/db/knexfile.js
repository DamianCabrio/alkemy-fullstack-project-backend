import '../helpers/loadEnv.js'

const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE, DB_CLIENT } = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASS,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
