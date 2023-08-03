// module imports
// component imports
import app from './app.js';
import logger from './configs/logger.config.js';

// env variables
const PORT = process.env.PORT || 8000;
console.log('env: ', process.env.NODE_ENV);

let server;

// listen on port
server = app.listen(PORT, () => {
    logger.info(`Server is listening to PORT ${PORT}...`);
    // console.log('process id: ', process.pid);
    // throw new Error('error in server..')
})

// handle server errors
const exitHandler = () => {
    if(server){
        logger.info('Server closed');
        process.exit(1);
    }else{
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error.stack);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// SIGTERM
process.on('SIGTERM', () => {
    if(server){
        logger.info('Server closed');
        process.exit(1);
    }
})