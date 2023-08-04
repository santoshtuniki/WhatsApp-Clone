// module imports
import mongoose from 'mongoose';

// component imports
import app from './app.js';
import logger from './configs/logger.config.js';

// env variables
const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;
console.log('env: ', process.env.NODE_ENV);

// mongodb debug mode
if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}

// mongodb connection
(async () => {
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
})();

// listen on port
let server;

server = app.listen(PORT, () => {
    logger.info(`Server is listening to PORT ${PORT}.`);
    // console.log('process id: ', process.pid);
    // throw new Error('error in server..')
})

// handle server errors
const exitHandler = () => {
    if (server) {
        logger.info('Server closed');
        process.exit(1);
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error.stack);
    exitHandler();
};

// eventhandlers in 'process'
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// SIGTERM
process.on('SIGTERM', () => {
    if (server) {
        logger.info('Server closed');
        process.exit(1);
    }
})