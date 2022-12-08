const cors = require('cors');
const express = require('express');

const app = express();

// define routes for http connections
const testRoute = require('./routes/testRoute');
const messageRoute = require('./routes/messageRoute');
const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');

app.use(express.static('public')); // Define public folder
app.use('/uploads', express.static('uploads')); // Define and expose uploads folder
app.use('/thumbnails', express.static('thumbnails')); // Define and expose thumbnails folder

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/post', postRoute);
app.use('/message', messageRoute);
app.use('/test', testRoute);
app.use('/auth', authRoute);

// define the port the server listens for outside connection
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(
    `App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`
  );
});
