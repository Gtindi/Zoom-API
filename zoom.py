const { Schema, model } = require('mongoose');

const meetingSchema = new Schema({
  userId: { type: String, required: true },
  meetingId: { type: String, required: true },
  topic: { type: String, required: true },
  startUrl: { type: String },
  joinUrl: { type: String },
});

// const Meeting = model('ZoomMeeting', zoomMeetingSchema);
// module.exports = Meeting;

module.exports = model('ZoomMeeting', zoomMeetingSchema);
