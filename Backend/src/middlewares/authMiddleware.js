// module imports
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';

// component imports
import logger from '../configs/logger.config.js';

// Default export
export default async function (req, res, next) {

    // check if authorization key exists in header
    if (!req.headers['authorization'])
        return next(createHttpError.Unauthorized());

    // retrieve token
    const bearerToken = req.headers['authorization'];

    const token = bearerToken.split(' ')[1];

    // verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createHttpError.Unauthorized());
        }
        req.user = payload;
        next();
    });

} 