// get the environment variable
require("dotenv").config();

// local requirements
const express = require("express");




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