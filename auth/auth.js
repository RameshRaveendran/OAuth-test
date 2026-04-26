const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require('../models/user');

router.get('/auth/google/callback', async (req, res) => {
  try {
    const { email, id } = userProfile; // from Google

    // 1. Check existing user
    let user = await User.findOne({ email });

    // 2. If not exists → create
    if (!user) {
      user = await User.create({
        email,
        provider: 'google',
        providerId: id
      });
    }

    console.log("Logged in user:", user);

    res.redirect('/dashboard');

  } catch (err) {
    console.log(err);
    res.send("Error in login");
  }
});

// STEP 1: Redirect to Google
router.get("/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;

  res.redirect(url);
});

// ✅ STEP 2: CALLBACK ROUTE (PUT HERE)
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange code → access token
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const accessToken = tokenRes.data.access_token;

    // Get user profile
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // show data
    console.log(userRes.data);

    res.send("Login Success");

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.send("Login Failed");
  }
});

module.exports = router;