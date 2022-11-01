// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
	res.json({ greeting: 'hello API' });
});

app.get('/api/:date', (req, res) => {
	var date_string = req.params.date;
	if (date_string.length > 4 && date_string.charAt(4) == '-') {
		let date = new Date(date_string);
		if (date == 'Invalid Date')
			res.json({ error: "Invalid Date" });
		else {
			let unixTimestamp = Date.parse(date);
			let utc = date.toUTCString();
			res.json({ unix: unixTimestamp, utc: utc });
		}
	}
	else {
		let date = new Date(parseInt(date_string));
		if (date == 'Invalid Date')
			res.json({ error: "Invalid Date" });
		else {
			res.json({ unix: parseInt(date_string), utc: date.toUTCString() });
		}
	}
});



// listen for requests :)

// PORT = 3000 | process.env.PORT;
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
