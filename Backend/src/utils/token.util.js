// module imports
import jwt from 'jsonwebtoken';

// component imports
import logger from '../configs/logger.config.js';

// named exports
export const sign = async (payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn }, (err, token) => {
            if (err) {
                logger.err(err.message);
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}