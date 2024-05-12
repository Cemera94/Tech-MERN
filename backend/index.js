const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// controllers
const errorController = require('./controllers/errorController');

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// UČITAJ STATIČKE FAJLOVE
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/category', categoryRoutes);

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
