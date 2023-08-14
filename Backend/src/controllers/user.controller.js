// module importsu
import createHttpError from "http-errors";

// component imports
import { searchUsers as searchUsersService } from '../services/user.service.js';

// named exports
export const searchUsers = async (req, res, next) => {
    try {
        // retrieve query
        const { search } = req.query;

        // check if search exists
        if (!search) {
            logger.error('Please add a search term first');
            throw createHttpError.BadRequest('Oops... Something went wrong');
        }

        // Find user(s)
        const users = await searchUsersService(search, req.user.userId);

        // response
        res.status(200).json(users);

    } catch (error) {
        next(error)
    }
}