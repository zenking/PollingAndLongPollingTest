var express = require('express');
var bodyParser = require('body-parser')

var routers = require('./routers');

var app = express();

app.use(express.static(__dirname + '/web'));  
app.use(bodyParser.urlencoded({ extended: false }));

//普通轮询
app.post('/polling', routers.polling);

//长轮询
app.post('/longpolling', routers.longpolling);


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

	