const mongoose = require('mongoose');
const { URL } = require('./config');

const initDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(URL);
    console.log('Established connection to MongoDB');
  } catch (err) {
    console.warn('Failed to connect to MongoDB:', err);
  }
};

module.exports = initDB;
