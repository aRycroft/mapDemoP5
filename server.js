let exp = require('express');
let app = exp();
let fs = require('fs');
let dotenv = require('dotenv');
dotenv.config();

const port = 8080;

app.use(exp.static('public'));

app.get('/geojson', function (req, res) {
	let data = fs.readFileSync('geojson/route_test.geojson');
	let json = JSON.parse(data);
	res.send(json);
});

app.get('/api', function(req, res){
	res.send(process.env.api);
});

app.listen(port, function(){
	console.log("Listening on port 8080");
});