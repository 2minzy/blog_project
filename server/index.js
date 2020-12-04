const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const postRoutes = require('./routes/postRoutes');

dotenv.config();

connectDB();

const app = express();

// bodyparser middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
