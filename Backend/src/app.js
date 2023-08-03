// module imports
import express from 'express';

// create express app
const app = express();

// home route
app.get('/', (req, res) => {
    res.end('Hello from server')
})

// Default export
export default app;