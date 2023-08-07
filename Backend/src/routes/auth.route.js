// module imports
import express from 'express';
import trimRequest from 'trim-request';

// component imports
import { login, logout, refreshToken, register } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// router
const authRouter = express.Router();

// register route
authRouter.route('/register').post(trimRequest.all, register);

// login route
authRouter.route('/login').post(trimRequest.all, login);

// logout route
authRouter.route('/logout').post(trimRequest.all, logout);

// refreshToken route
authRouter.route('/refreshtoken').post(trimRequest.all, refreshToken);

// authMiddleware route
authRouter.route('/testingAuthMiddleware').get(trimRequest.all, authMiddleware, (req, res) => {
    res.json(req.user)
});

// Default export
export default authRouter;