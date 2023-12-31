export default {
  db: {
    url: process.env.DATABASE_URL,
  },
  sessionSecret: process.env.SESSION_SECRET,
  port: process.env.PORT || 5000,
  isProduction: process.env.NODE_ENV === "production",
};
