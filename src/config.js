export default {
  db: {
    url: process.env.DATABASE_URL,
  },
  port: process.env.PORT || 5000,
  isProduction: process.env.NODE_ENV === "production",
};
