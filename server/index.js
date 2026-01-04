require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();
// Allow cross-origin requests from the frontend during development
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/', contactRoutes); // POST /contact

// Basic health check
app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

async function start() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set — server will still start, but DB operations will fail.');
  } else {
    await mongoose.connect(process.env.MONGO_URI, {
      // useUnifiedTopology/useNewUrlParser no longer required in mongoose v7
    });
    console.log('Connected to MongoDB');
  }

  app.listen(PORT, () => console.log(`Auth server listening on port ${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});

module.exports = app; // exported for testing
