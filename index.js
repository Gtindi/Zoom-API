const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/zoom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Define a Zoom Meeting schema
const MeetingSchema = new mongoose.Schema({
  topic: String,
  start_time: Date,
  duration: Number,
  password: String,
  settings: Object,
});

// Define a Zoom Meeting model
const Meeting = mongoose.model('Meeting', MeetingSchema);

// Create a new Express app
const app = express();

// Define a route to create a new meeting
app.post('/api/meetings', async (req, res) => {
  try {
    // Make a request to the Zoom API to create a new meeting
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
      topic: req.body.topic,
      type: 2,
      start_time: req.body.start_time,
      duration: req.body.duration,
      password: req.body.password,
      settings: req.body.settings,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.ZOOM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Create a new meeting document in MongoDB
    const meeting = new Meeting({
      topic: response.data.topic,
      start_time: response.data.start_time,
      duration: response.data.duration,
      password: response.data.password,
      settings: response.data.settings,
    });

    await meeting.save();

    // Send the meeting data back to the client
    res.status(201).json(meeting);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

