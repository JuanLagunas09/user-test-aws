import "dotenv/config";

export const config = {
  PORT: process.env.PORT || 3001,
  URL_AUTH_MSV: process.env.URL_AUTH_MSV,
  STAGE_API: process.env.STAGE_API || "v1",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_CONNECT: process.env.JWT_SECRET_CONNECT,
  KEY_CONNECT: process.env.KEY_CONNECT,

  // Database
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    USERNAME: process.env.DB_USERNAME || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    NAME: process.env.DB_NAME || "test",
    TYPE: "mysql" as "mysql",
  },
};
