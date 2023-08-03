// module imports


// component imports
import app from './app.js';

// env variables
const PORT = process.env.PORT || 8000;
console.log(process.env.NODE_ENV)

// Listen on port
app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}...`)
})