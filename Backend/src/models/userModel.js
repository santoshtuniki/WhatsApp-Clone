// module imports
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: [true, 'This email address already exists'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    picture: {
        type: String,
        default: 'https://i.ibb.co/ZH0Br80/default-Person.jpg',
    },
    status: {
        type: String,
        default: 'Hey there! I am using Whatsapp',
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: [6, 'Please make sure password is atleast 6 characters long'],
        maxLength: [128, 'Please make sure password is less than 128 characters long'],
    },
},
    {
        collection: 'users',
        timestamps: true
    }
);

// hash password
userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (err) {
        next(err)
    }
})

// User Model
const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

// Default export
export default UserModel;