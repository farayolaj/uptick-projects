import { createLogger, format, transports } from "winston";
import LokiTransport from "winston-loki";
import config from "../config.js";

let logger;

const initializeLogger = () => {
  if (logger) {
    return;
  }

  logger = createLogger({
    transports: [
      new LokiTransport({
        host: config.loki.host,
        basicAuth: config.loki.basicAuth,
        labels: { app: "chat-app" },
        json: true,
        format: format.json(),
        replaceTimestamp: true,
        onConnectionError: (err) => console.error(err),
      }),
      new transports.Console({
        format: format.combine(format.simple(), format.colorize()),
      }),
    ],
  });
};

export const getLogger = () => {
  initializeLogger();
  return logger;
};
