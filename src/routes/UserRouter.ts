import express from 'express';
import * as UserController from '../controllers/UserController';

const Router = express.Router();

Router.get('/hello', UserController.getHelloAuth);
Router.post('/register', UserController.store);

export default Router;