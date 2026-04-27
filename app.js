// get the environment variable
require("dotenv").config();

// installed requirements
const express = require("express");
const session = require("express-session");
// local requirements
const connectDB = require("./config/db");
const authRoutes = require("./auth/auth");

// db connection
connectDB();

// express app
const app = express();

// application level middleware
app.use(express.json());

// config of view engine
app.set("view engine", "ejs");

// to access static files in public folder (middleware)
app.use(express.static("public"));

// session creation
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// route handlers
app.use("/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// app.get('/query',(req , res) => {

//     const {userId , status} = req.query;
//     // const respond = Number(userId )+ Number(postId);
//     res.send(`its works poda pulle, user id is ${userId} , status ${status}`);
//     console.log(userId , status)
// });
// app.get('/params/:id/name/:na',(req , res) => {
//     res.send(req.params);
//     console.log(req.params)
// });

// port init
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
