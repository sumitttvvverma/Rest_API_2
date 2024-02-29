const mongoose = require('mongoose');

// const uri = 'mongodb://localhost:27017/restcurd';

//this one is for mongoose@5.0.18
async function connectDB(uri) {
  try {
   await mongoose.connect(uri);
   let db = mongoose.connection;  
   await db.createCollection('collection')                  
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Export the connectDB function
module.exports = connectDB ;