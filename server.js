// server.js
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Home route
app.get('/', (req, res) => {
  res.send('MEN Stack CRUD App Lab');
});

// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
