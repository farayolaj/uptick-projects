import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import pg from "pg";
import config from "../config.js";

export const pgPool = new pg.Pool({
  connectionString: config.db.url,
  ssl: config.isProduction
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
  min: 1,
  max: 2,
});
export const PgStore = connectPgSimple(session);

const sessionMiddleware = session({
  store: new PgStore({
    pool: pgPool,
    createTableIfMissing: true,
  }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true },
  unset: "destroy",
});

export default sessionMiddleware;
