import passport from "passport";
import {
  Strategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { config } from "../config/config";
import boom from "@hapi/boom";

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET!,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    if (payload.token) {
      return done(null, payload);
    }
    return done(boom.unauthorized("Unauthorized"), false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use("jwt", jwtStrategy);
