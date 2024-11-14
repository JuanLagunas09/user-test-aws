import { DataSource } from "typeorm";
import { config } from "./config";


export const AppDataSource = new DataSource({
    type: config.DB.TYPE,
    host: config.DB.HOST,
    port: config.DB.PORT,
    username: config.DB.USERNAME,
    password: config.DB.PASSWORD,
    database: config.DB.NAME,
    synchronize: false,
    logging: true,
    connectTimeout: 30000,
    entities: ["src/entity/**/*.ts", "src/entity/**/*.js"],
    migrations: ["src/migration/**/*.ts", "src/migration/**/*.js"],
})
