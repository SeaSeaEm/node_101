const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './Config/config.env' })
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, console.log(`Server running in ${process.env.NODE_END} mode on port ${PORT}`));
