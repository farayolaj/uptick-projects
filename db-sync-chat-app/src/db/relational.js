import knex from "knex";
import config from "../config.js";
import { getLogger } from "../logger/index.js";

const logger = getLogger();

/**
 * @type {ReturnType<typeof knex>}
 */
export let db;

export async function connectToDb() {
  if (!db) {
    db = knex({
      client: "pg",
      connection: {
        connectionString: config.db.url,
      },
    });

    try {
      await db.raw("SELECT 1");
      logger.info("Connected to postgres database");
    } catch (error) {
      console.error("Could not connect to postgres database", error);
      process.exit(1);
    }
  }
}

export async function disconnectFromDb() {
  if (db) {
    try {
      await db.destroy();
    } catch (error) {
      console.error("Error disconnecting from postgres database", error);
    }
  }
}
