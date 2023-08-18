// module imports
import mongoose from 'mongoose';

// component imports
import logger from '../configs/logger.config.js';

// env variables
const { DATABASE_URL } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('Connected to Mongodb');
    } catch (error) {
        logger.error(`Mongodb connection error: ${error.message}`);
        process.exit(1);
    }
}

export default  connectDB;