import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { boomHandler, errorHandler } from "./middlewares/boomHandler";

//Jwt Strategy
import("./utils/jwtStrategy");

// Init express server
const app = express();
app.use(cors());
app.use(express.json());

//Prefix 
const router = express.Router();
app.use(`/${config.STAGE_API}/user`, router);

//Routes
router.get("/hello", (_req, res) => {
  res.send("Hello user banana!");
});

// Errors middleware
app.use(boomHandler);
app.use(errorHandler);

// Start server locally
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

export default app;