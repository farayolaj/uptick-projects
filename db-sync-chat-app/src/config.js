export default {
  db: {
    url: process.env.DATABASE_URL,
    mongoUrl: process.env.MONGO_URL,
  },
  sessionSecret: process.env.SESSION_SECRET,
  port: process.env.PORT || 5000,
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  loki: {
    host: process.env.LOKI_HOST || "",
    basicAuth: process.env.LOKI_BASIC_AUTH || "",
  },
};
