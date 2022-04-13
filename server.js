const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');

const connectDb = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000;

// Connect to database
connectDb();

// route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// body parser
app.use(express.json());

// dev logging middleware
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

// add error handler
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_END} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
