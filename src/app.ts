import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { boomHandler, errorHandler } from "./middlewares/boomHandler";
import UserRouter from "./routes/UserRouter";
import { AppDataSource as dbConnection } from "./config/db";

//Jwt Strategy
import("./utils/jwtStrategy");

// Init express server
const app = express();
app.use(cors());
app.use(express.json());

//Prefix
const router = express.Router();
app.use(`/${config.STAGE_API}/user`, router);

// Routes
router.use("/", UserRouter);

// Errors middleware
app.use(boomHandler);
app.use(errorHandler);

// Start server locally
app.listen(config.PORT, () => {
  try {
    console.log(`Server running on port ${config.PORT}`);
    dbConnection.initialize();
  } catch (error) {
    console.log("Error starting server", error);
  }
});

/* const initApp = async () => {
  try {
    console.log("Initializing app");
    await dbConnection.initialize();
  } catch (error) {
    console.log("Error initializing app", error);
  }
}

initApp(); */

export default app;
