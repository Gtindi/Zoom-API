<h1> ZOOM APIs </h1>
The endpoints for 'index.js' code are/api/meetings.
<ul>
Assuming that the front-end developer wants to interact with the Zoom API endpoints, the following endpoints would be relevant:
<li> <b>POST /api/meetings</b>: This endpoint creates a new Zoom meeting by making a request to the Zoom API and saves the meeting 
details to a MongoDB database. The front-end developer can send a POST request to this endpoint with the meeting details in the 
request body to create a new meeting. The response will contain the details of the newly created meeting. It expects a JSON object in the request body with the following properties:
<ul>
<li> topic: the topic of the meeting (string) </li>
<li> start_time: the start time of the meeting (ISO-8601 date string) </li>
<li> duration: the duration of the meeting in minutes (number) </li>
<li> password: the password for the meeting (string) </li>
<li> settings: an object containing various settings for the meeting, such as whether to enable video or audio for participants (object) </li>
</ul>
</li>
</ul>