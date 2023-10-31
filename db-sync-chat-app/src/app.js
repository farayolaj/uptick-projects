import express from "express";
import { engine } from "express-handlebars";
import handlebarsDateFormat from "handlebars-dateformat";
import { join } from "path";
import { fileURLToPath } from "url";
import { connectToDb } from "./db/relational.js/index.js";
import { authMiddleware } from "./middlewares/auth.js";
import sessionMiddleware from "./middlewares/session.js";
import authRouter from "./routes/auth.js";
import roomRouter from "./routes/rooms.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(express.static(join(__dirname, "/../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");
app.engine(
  ".hbs",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: ".hbs",
    defaultLayout: "index",
    helpers: {
      dateFormat: handlebarsDateFormat,
      isEqual: function (a, b) {
        return a === b;
      },
    },
  })
);

await connectToDb();

app.use("/", authRouter);
app.use(authMiddleware);
app.get("/", (req, res) => {
  res.redirect("/rooms");
});
app.use("/rooms", roomRouter);

export default app;
