const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST /contact
router.post('/contact', async (req, res) => {
  const { name, email, message, source } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'name, email and message are required' });

  try {
    const contact = await Contact.create({ name, email, message, source });

    // In production you might enqueue a job, send an email, etc.
    res.json({ ok: true, id: contact._id });
  } catch (err) {
    console.error('Contact create failed', err);
    res.status(500).json({ message: 'Failed to save contact' });
  }
});

module.exports = router;