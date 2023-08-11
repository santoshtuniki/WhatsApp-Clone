// module imports
import createHttpError from 'http-errors';

// component imports
import { UserModel } from '../models/index.js';

// named exports
export const findUser = async (userId) => {

    // find user
    const user = await UserModel.findById(userId).lean();

    // check if user exists
    if (!user) throw createHttpError.BadRequest('Please fill all the fields...');

    // return
    return user;
}

export const searchUsers = async (search) => {
    const users = await UserModel.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ],
    });

    // return
    return users;
}