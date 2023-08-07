// component imports
import createHttpError from 'http-errors';
import { createUser, signInUser } from '../services/auth.service.js';
import { generateToken, verifyToken } from '../services/token.service.js';
import { findUser } from '../services/user.service.js';

// named exports
export const register = async (req, res, next) => {
    try {
        // const { name, email, picture, status, password } = req.body;

        // save user details
        const newUser = await createUser(req.body);

        // env variables
        const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

        // token generation
        const access_token = await generateToken({ userId: newUser._id }, '1d', ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: newUser._id }, '30d', REFRESH_TOKEN_SECRET);

        // console.table({ access_token, refresh_token });

        // cookie
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/v1/auth/refreshtoken',
            maxAge: 30 * 24 * 60 * 60 * 1000,   // 30 days
        });

        // response
        res.json({
            message: 'register success...',
            access_token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
                password: newUser.password
            }
        });

    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        // const { email, password } = req.body;

        // extract user details
        const user = await signInUser(req.body);

        // env variables
        const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

        // token generation
        const access_token = await generateToken({ userId: user._id }, '1d', ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: user._id }, '30d', REFRESH_TOKEN_SECRET);

        // cookie
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/v1/auth/refreshtoken',
            maxAge: 30 * 24 * 60 * 60 * 1000,   // 30 days
        });

        // response
        res.json({
            message: 'login success...',
            access_token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
            },
        });

    } catch (err) {
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshtoken', { path: '/api/v1/auth/refreshtoken' });

        res.json({
            message: 'logged out!'
        })

    } catch (err) {
        next(err);
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        // retrieve refresh_token
        const refresh_token = req.cookies.refreshtoken;

        // check if refreshtoken exists
        if (!refresh_token) throw createHttpError.Unauthorized('Please login...');

        // env variables
        const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

        // verify refreshtoken
        const check = await verifyToken(refresh_token, REFRESH_TOKEN_SECRET);

        // extract user details
        const user = await findUser(check.userId);

        // token generation
        const access_token = await generateToken({ userId: user._id }, '1d', ACCESS_TOKEN_SECRET);

        // response
        res.json({
            access_token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
            },
        });

    } catch (err) {
        next(err);
    }
}