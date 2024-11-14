import passport from "passport";
import {
  Strategy,
  ExtractJwt,
  StrategyOptionsWithRequest
} from "passport-jwt";
import { config } from "../config/config";
import boom from "@hapi/boom";
import { getUserCognito } from "../services/RemoteConnection";

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET!,
  passReqToCallback: true
};

const jwtStrategy = new Strategy(options, async (req, payload, done) => {
  try {
    if (payload.token) {
      const user = await getUserCognito(req.headers.authorization);
      if(user) return done(null, payload);
      
      return done(boom.unauthorized("Unauthorized cognito"), false);
    }
    return done(boom.unauthorized("Unauthorized"), false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use("jwt", jwtStrategy);
