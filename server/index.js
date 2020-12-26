const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile }); // process.env only works after this line except NODE_ENV

require('./middleware/passport');

connectDB();

const app = express();

// bodyparser middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

module.exports = app;
