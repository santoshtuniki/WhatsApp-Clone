// component imports
import { createUser } from '../services/auth.service.js';

// named exports
export const register = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;

        // save user details
        const newUser = await createUser(req.body);

        // token generation
        const access_token = await generateToken({ userId: newUser._id }, '1d', process.env.ACCESS_TOKEN_SECRET)
        const refresh_token = await generateToken({ userId: newUser._id }, '30d', process.env.REFRESH_TOKEN_SECRET)

        res.json(newUser);
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const refreshToken = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}