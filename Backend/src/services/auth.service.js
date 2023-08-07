// module imports
import createHttpError from 'http-errors';
import validator from 'validator';
import bcrypt from 'bcrypt';

// component imports
import { UserModel } from '../models/index.js';

// env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

// named exports
export const createUser = async ({ name, email, picture, status, password }) => {

    // check if fields are empty
    if (!name || !email || !password) {
        throw createHttpError.BadRequest('Please fill all the fields');
    }

    // check name length
    if (!validator.isLength(name, {
        min: 2, max: 16
    })) {
        throw createHttpError.BadRequest('Please make sure your name is between 2 and 16 characters');
    }

    // check status length
    if (status && status.length > 64) {
        throw createHttpError.BadRequest('Please make sure your status is less than 64 characters');
    }

    // check if email is valid
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Please provide a valid email address');
    }

    // check if user already exists
    const checkDB = await UserModel.findOne({ email });
    if (checkDB) {
        throw createHttpError.Conflict('Please try again with different email address, this email already exists');
    }

    // check password length
    if (!validator.isLength(password, {
        min: 6, max: 128
    })) {
        throw createHttpError.BadRequest('Please make sure your password is between 6 and 128 characters');
    }

    // hash password -- to be done in the UserModel

    // add user to database
    let user = await UserModel.create({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password
    });

    // return
    return user;

}

export const signInUser = async ({ email, password }) => {

    // find user
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

    // check if user exists
    if (!user) throw createHttpError.NotFound('Invalid Credentials');

    // compare passwords
    const passwordMatches = await bcrypt.compare(password, user.password);

    // if password doesn't match
    if (!passwordMatches) throw createHttpError.NotFound('Invalid Credentials');

    // return
    return user;

}