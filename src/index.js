import connectPgSimple from "connect-pg-simple";
import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import pg from "pg";
import { fileURLToPath } from "url";
import config from "./config.js";
import { connectToDb } from "./db/index.js";
import { authMiddleware } from "./middlewares/auth.js";
import authRouter from "./routes/auth.js";
import recipeRouter from "./routes/recipes.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pgPool = new pg.Pool({
  connectionString: config.db.url,
  ssl: config.isProduction
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
  min: 1,
  max: 2,
});
const PgStore = connectPgSimple(session);

app.use(
  session({
    store: new PgStore({
      pool: pgPool,
      createTableIfMissing: true,
    }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: config.isProduction, httpOnly: true },
  })
);

app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");
app.engine(
  ".hbs",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: ".hbs",
    defaultLayout: "index",
  })
);

await connectToDb();

app.use("/", authRouter);
app.use(authMiddleware);
app.get("/", (req, res) => {
  res.redirect("/recipes");
});
app.use("/recipes", recipeRouter);

const server = app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing server");
  server.close(() => {
    debug("Server closed");
  });
});
