// get the environment variable
require("dotenv").config();

// installed requirements
const express = require("express");

// local requirements
const connectDB = require('./config/db');




// db connection
connectDB();




// express app
const app = express();

// test route
app.get("/",(req , res) => {
    res.send('server is live');
})

// port init
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})