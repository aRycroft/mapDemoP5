var key;
let mappa;
let myMap;
let canvas;
let data;

function setupMap(){
	let  options = {
  		lat: 51.44952273,
  		lng: -2.5967858,
  		zoom: 17,
  		studio: true, 
  		style: 'mapbox://styles/mapbox/streets-v11',
	};
	myMap = mappa.tileMap(options);
 	myMap.overlay(canvas);
}

function getJSONcallback(json){
	data = json;
}

function getRouteCoords(){
	let positions = [];
	let coords = data.features[0].geometry.coordinates;
	for(let i = 0; i < coords.length; i++){
		let coord = coords[i];
		positions.push(myMap.latLngToPixel(coord[1], coord[0]));
	}
	return positions;
}

function preload() {
	key = loadStrings('/api');
}

function setup() {
	mappa = new Mappa('Mapbox', key[0]);
  	canvas = createCanvas(500, 500);
  	setupMap();
  	loadJSON('/geojson', getJSONcallback);
}

function draw() {
	clear();
	if(data != null){
		var positions = getRouteCoords();
		for(let i = 0; i < positions.length - 1; i++){
			line(positions[i].x, positions[i].y, positions[i+1].x, positions[i+1].y);
			stroke(0);
			strokeWeight(8);
		}
	}
}
