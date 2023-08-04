// module imports
import express from 'express';
import dotenv from 'dotenv';
import createHttpError from 'http-errors';

// middleware imports
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';

// component imports
import routes from './routes/index.js';

// dotEnv config
dotenv.config();

// create express app
const app = express();

// morgan - http request logger
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// helmet - secure express apps
app.use(helmet());

// express json - parse json data from body 
app.use(express.json());

// express json - parse json data from  url
app.use(express.urlencoded({ extended: true }));

// express-mongo-sanitize - sanitize user requests
app.use(mongoSanitize());

// cookie-parser - Enable cookie parser
app.use(cookieParser());

// compression - Compress response body, gzip
app.use(compression());

// express-fileupload - Access uploaded files using req.files
app.use(fileUpload({ useTempFiles: true }));

// cors - Protect and restrict access to server
app.use(cors({
    origin: 'http://localhost:3000'
}));

// api v1 routes
app.use('/api/v1', routes);

// Home route
app.get('/', (req, res) => {
    res.end('Hello from server')
})

// Test route
app.post('/test', (req, res) => {
    // res.end(`Hi ${req.body.name}`)
    throw createHttpError.BadGateway('This route has an error')
})

// error handling
app.use(async (req, res, next) => {
    next(createHttpError.NotFound('This route does not exists'))
})

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            'status': err.status,
            'message': err.message
        }
    })
})

// Default export
export default app;