import express from 'express';
import * as UserController from '../controllers/UserController';
import passport from 'passport';

const Router = express.Router();

Router.get('/hello', UserController.getHelloAuth);
Router.post('/register', UserController.store);
Router.get('/show', 
    passport.authenticate('jwt', { session: false }),
    UserController.show); // Add this line

export default Router;