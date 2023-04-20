// Import the zoomus package and initialize it with your Zoom API key and secret:
const Zoom = require('zoomus')({
    key: 'YOUR_ZOOM_API_KEY',
    secret: 'YOUR_ZOOM_API_SECRET'
  });

//  Load the Zoom API JSON file
const fs = require('fs');

const zoomApiJson = fs.readFileSync('zoom_api.json');
const zoomApi = JSON.parse(zoomApiJson);
  
/*
* Create a new Zoom meeting using the Zoom.meeting.create() method 
* and passing in the required parameters, such as the meeting topic, start time, duration, and user ID.
*/
Zoom.meeting.create({
    topic: zoomApi.topic,
    start_time: zoomApi.start_time,
    duration: zoomApi.duration,
    timezone: zoomApi.timezone,
    password: zoomApi.password,
    agenda: zoomApi.agenda,
    settings: {
      host_video: zoomApi.host_video,
      participant_video: zoomApi.participant_video,
      mute_upon_entry: zoomApi.mute_upon_entry,
      approval_type: zoomApi.approval_type,
      registration_type: zoomApi.registration_type,
      audio: zoomApi.audio,
      auto_recording: zoomApi.auto_recording,
      enforce_login: zoomApi.enforce_login
    },
    host_id: zoomApi.host_id
  }, function(err, result) {
    if (err) {
      console.log('Error creating Zoom meeting:', err);
    } else {
      console.log('Zoom meeting created successfully:', result);
    }
  });
  