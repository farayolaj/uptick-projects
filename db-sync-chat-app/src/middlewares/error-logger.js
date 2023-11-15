import { getLogger } from "../logger/index.js";

export const logError = (err, req, res, next) => {
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;

  const logger = getLogger();
  logger.error({
    message: `method=${method} url=${url} status=${status} error=${err.stack}`,
    labels: { origin: "api" },
  });
  next();
};
