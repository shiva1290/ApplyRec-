const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

testConnection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
