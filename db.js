const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Export db connection
module.exports = db;
