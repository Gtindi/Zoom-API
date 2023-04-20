const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Zoom = require('zoomus')({
  key: 'YOUR_ZOOM_API_KEY',
  secret: 'YOUR_ZOOM_API_SECRET'
});

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
  console.log('Connected to MongoDB!!!');
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
    // Create a new Zoom meeting using the Zoom API code
    const zoomMeeting = await Zoom.meeting.create({
      topic: req.body.topic,
      start_time: req.body.start_time,
      duration: req.body.duration,
      password: req.body.password,
      settings: req.body.settings,
      host_id: 'YOUR_ZOOM_USER_ID'
    });

    // Create a new meeting document in MongoDB
    const meeting = new Meeting({
      topic: zoomMeeting.topic,
      start_time: zoomMeeting.start_time,
      duration: zoomMeeting.duration,
      password: zoomMeeting.password,
      settings: zoomMeeting.settings,
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
