const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Create note
router.post('/create', async (req, res) => {
  const user = req.session.user;

  const note = new Note({
    content: req.body.content,
    userId: user._id
  });

  await note.save();

  res.redirect('/dashboard');
});