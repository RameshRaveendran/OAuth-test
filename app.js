// get the environment variable
require("dotenv").config();

// installed requirements
const express = require("express");
const session = require("express-session");
const cookieParser = require('cookie-parser');

// local requirements
const connectDB = require("./config/db");
const authRoutes = require("./auth/auth");
const { isLoggedIn } = require('./auth/middleware');

// db connection
connectDB();

// express app
const app = express();

// application level middleware
app.use(express.json());


app.use(cookieParser());


// config of view engine
app.set("view engine", "ejs");

// to access static files in public folder (middleware)
app.use(express.static("public"));

// session creation
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,   // IMPORTANT for localhost
  }
}));

// route handlers
app.use("/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.render("login");
});


app.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// port init
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
