const mongoose = require('mongoose');

// Function to connect to MongoDB
async function mongodb() {
  try {
    await mongoose.connect('mongodb://localhost:27017/real_time_app')
     
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error:', err);
  }
}

module.exports = mongodb;
