const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require('../models/user');

// STEP 1: Redirect to Google
router.get("/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;

  res.redirect(url);
});

// ✅ STEP 2: SINGLE CALLBACK (FIXED)
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // 1. Exchange code → token
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

    // 2. Get user profile
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userProfile = userRes.data;

    const { email, id } = userProfile;

    // 3. Store in DB
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        provider: "google",
        providerId: id,
      });
    }

    console.log("Logged in user:", user);

  

console.log("Before saving:", req.session);

req.session.user = user;

console.log("After saving:", req.session);

    // 4. Redirect
    res.redirect("/dashboard");

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.send("Login Failed");
  }
});

module.exports = router;