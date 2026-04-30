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

router.get('/all', async (req, res) => {
  const user = req.session.user;

  const notes = await Note.find({ userId: user._id });

  res.render('dashboard', { notes });
});

router.get('/delete/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard');
});

router.post('/update/:id', async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, {
    content: req.body.content
  });

  res.redirect('/dashboard');
});