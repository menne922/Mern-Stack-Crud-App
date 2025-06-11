const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

// MongoDB connection URI
const MONGO_URI = 'mongodb://localhost:27017/db_test';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Database connected successfully!'))
  .catch((err) => console.error('❌ Database connection error:', err));