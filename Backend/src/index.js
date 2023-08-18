// module imports
import mongoose from 'mongoose';
import { Server } from 'socket.io';

// component imports
import app from './app.js';
import logger from './configs/logger.config.js';
import connectDB from './database/connectDB.js';

// env variables
const { CLIENT_ENDPOINT, PORT, NODE_ENV } = process.env;
console.log('env: ', NODE_ENV);

// express PORT
const EXPRESS_PORT = PORT || 8000;

// mongodb debug mode
if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}

// mongodb connection
connectDB();

// listen on port
let server;

server = app.listen(EXPRESS_PORT, () => {
    logger.info(`Server is listening to PORT ${EXPRESS_PORT}.`);
    // console.log('process id: ', process.pid);
    // throw new Error('error in server..')
})

// socket.io Server
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: CLIENT_ENDPOINT
    }
})

// socket connection
io.on('connection', (socket) => {
    logger.info('socket io connected successfully.');
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