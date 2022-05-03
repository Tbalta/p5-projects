
var font;
let vehicles = [];
let points = []
let oldParticle = 0;

function preload() {
	font = loadFont('AvenirNextLTPro-Demi.otf');
}


function setup() {
	createCanvas(900, 400);
	angleMode(DEGREES)
}

function draw() {
	background(51);

	// background(51);
	let hr = hour();
	let min = minute();
	let sd = second();

	// fill(255);

	// noStroke();
	// console.log(oldParticle)
	points = font.textToPoints(hr + ":" + min + ":" + sd, 0, 200, 192, { sampleFactor: 0.25 });

	if (oldParticle < points.length) {
		// console.log("hello");
		for (let i = oldParticle; i < points.length; i++) {
			vehicles.push(new Vehicle(points[i].x, points[i].y));
			// console.log(i)
		}
	}


	if (oldParticle > points.length) {
		console.log(vehicles.length)
		console.log(oldParticle-points.length);
		vehicles = vehicles.slice(oldParticle - points.length);
		console.log(vehicles.length);
	}

	oldParticle = points.length;

	for (let i = 0; i < vehicles.length; i++) {
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}

	for (vehicle of vehicles) {
		vehicle.behaviors();
		vehicle.update();
		vehicle.show();
	}


}