const express = require('express');
const cors = require('cors');
const app = express();

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist'));

// Map all routes to index.html
app.get('*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

// CORS Configuration
app.use(cors());

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
