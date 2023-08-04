// component imports
import { createUser } from '../services/auth.service.js';

// named exports
export const register = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
        const newUser = await createUser(req.body);
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