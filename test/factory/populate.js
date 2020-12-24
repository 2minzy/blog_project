const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('../../server/config/db');
const { populatePosts } = require('./PostFactory');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

(async () => {
  try {
    await connectDB();

    await populatePosts(50);

    await mongoose.connection.close();
  } catch (e) {
    console.log(e);
  }
})();
