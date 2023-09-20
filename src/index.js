import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import config from "./config.js";
import { connectToDb } from "./db/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const server = app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing server");
  server.close(() => {
    debug("Server closed");
  });
});
