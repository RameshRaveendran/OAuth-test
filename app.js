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

// application level middleware
app.use(express.json());


// test route
// app.get("/",(req , res) => {
//     res.send('server is live');
// });

app.get('/users/:userId/posts/:postId',(req , res) => {
    
    const {userId , postId} = req.params;
    const respond = Number(userId )+ Number(postId);
    res.send(`its works', ${respond}`);
    console.log(respond)
})

// port init
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})