import { join } from "path";
import Primus from "primus";
import Rooms from "primus-rooms";
import { fileURLToPath } from "url";
import sessionMiddleware from "./middlewares/session.js";
import handlers from "./realtime/handlers.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export function initPrimus(server) {
  const primus = new Primus(server, {});

  primus.save(join(__dirname, "/../public/js/primus.js"));

  primus.use("session", function () {
    return function (req, res, next) {
      res._implicitHeader = () => {};
      sessionMiddleware(req, res, next);
    };
  });

  primus.plugin("rooms", Rooms);

  primus.on("connection", (spark) => {
    spark.on(
      "data",
      (/** @type {import("./models/events.js").RoomEvent} */ data) => {
        handlers[data.title](spark, data);
      }
    );
  });
}
