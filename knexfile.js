// Update with your config settings.
import "dotenv/config";
import config from "./src/config.js";

/**
 * @type {import("knex").Knex.Config}
 */
const knexConfig = {
  client: "postgresql",
  connection: {
    connectionString: config.db.url,
    ssl: config.isProduction
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export default knexConfig;
