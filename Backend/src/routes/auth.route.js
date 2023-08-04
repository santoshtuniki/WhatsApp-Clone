// module imports
import express from 'express';
import trimRequest from 'trim-request';

// component imports
import { login, logout, refreshToken, register } from '../controllers/auth.controller.js';

// router
const authRouter = express.Router();

// register route
authRouter.route('/register').post(trimRequest.all, register);

// login route
authRouter.route('/login').post(trimRequest.all, login);

// logout route
authRouter.route('/logout').post(trimRequest.all, logout);

// refreshToken route
authRouter.route('/refreshToken').post(trimRequest.all, refreshToken);

// Default export
export default authRouter;