var express = require('express');
var app = express();
var path = require('path');
var chat = require('./chat');

app.use(express.static('public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(process.env.PORT || 8080);