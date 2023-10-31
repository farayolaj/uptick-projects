import { createServer } from "http";
import app from "./app.js";
import config from "./config.js";
import { initPrimus } from "./primus.js";

const server = createServer(app);
let liveServer;

// Only enable in development
if (!config.isProduction) {
  liveServer = createServer();
  const livereload = await import("livereload");
  const { default: connectLiveReload } = await import("connect-livereload");
  const liveReloadServer = livereload.createServer({ server: liveServer });
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

initPrimus(server);

server.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`);
});

process.on("SIGTERM", () => {
  console.log("\nSIGTERM signal received: closing server...");

  if (liveServer) {
    liveServer.close(() => console.log("Live reload disconnected"));
  }

  server.close(() => {
    console.log("Server closed");
  });
});

process.on("SIGINT", () => {
  console.log("\nSIGINT signal received: closing server...");

  if (liveServer) {
    liveServer.close(() => console.log("Live reload disconnected"));
  }

  server.close(() => {
    console.log("Server closed");
  });
});
