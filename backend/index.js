const express = require('express');
const cors = require('cors');
const app = express();

// controllers
const errorController = require('./controllers/errorController');

// Routes
const userRoutes = require('./routes/userRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// User Routes
app.use('/api/user', userRoutes);

// Global error handler
app.use(errorController);

// 404 ERROR
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Page not found',
  });
});

module.exports = app;
