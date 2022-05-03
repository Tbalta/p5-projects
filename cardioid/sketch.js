let total = 1000;
let r;
let factor = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	r = (height / 2) - 50;
}

function getPoint(angle) {
	let point = p5.Vector.fromAngle(angle + PI);
	point.mult(r);
	return point;
}



function draw() {
	if (mouseIsPressed) {
		total = map(mouseX, 0, width, 10, 1000);

	}

	factor += 0.005;
	translate(width / 2, height / 2);
	background(51);
	stroke(255);
	strokeWeight(1);
	noFill();
	strokeWeight(3);
	ellipse(0, 0, r * 2);
	fill(255);
	strokeWeight(20);



	for (let i = 0; i < total; i++) {
		let angle = map(i, 0, total, 0, TWO_PI);
		// let x = r * sin(angle);
		// let y = r * cos(angle);
		let coor = getPoint(angle);
		point(coor.x, coor.y);
	}

	strokeWeight(3);

	for (let i = 0; i < total; i++) {
		let angle = map(i, 0, total, 0, TWO_PI);
		let coor = getPoint(angle);
		angle = map(floor(i * factor) % total, 0, total, 0, TWO_PI);
		let next = getPoint(angle);
		line(coor.x, coor.y, next.x, next.y);
	}


}
