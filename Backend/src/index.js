// module imports
import dotenv from 'dotenv';

// component imports
import app from "./app.js";

// dotEnv config
dotenv.config();

// env variables
const PORT = process.env.PORT || 8000;

// Listen to port
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}...`)
});