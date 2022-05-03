let r;
let R;
var k = 6/5;
let x, y;
let paths = [];
let a = 0;
let spd;
let circlePOS;
function setup() {
	spd = 1;
	createCanvas(windowWidth, windowHeight);

	r = width / (30 * sqrt(k));
	circlePOS = createVector(0, 0);
	R = k * r;
	// r = 80;
}

function draw() {
	translate(width / 2, height / 2);
	background(51);
	stroke(255);
	ellipse(0, 0, R * 2)


	noFill();
	for (let index = 0; index < spd; index++) {

		circlePOS.x = (r + R) * cos(a);
		circlePOS.y = (r + R) * sin(a);
		ellipse(circlePOS.x, circlePOS.y, r * 2)

		// x = (R + r) * cos(a) - r * cos(((R + r) / r) * a);
		// y = (R + r) * sin(a) - r * sin(((R + r) / r) * a);

		x = r * (k + 1) * cos(a) - r* cos((k + 1) * a)
		y = r * (k + 1) * sin(a) - r * sin((k + 1) * a)


		// x = circlePOS.x + -r * cos(a);
		// y = circlePOS.y + -r * sin(a);
		a += 0.01;
		line(circlePOS.x, circlePOS.y, x, y);
		strokeWeight(9);
		stroke(255, 0, 0);
		paths.push(createVector(x, y));
		beginShape();
		for (path of paths) {
			vertex(path.x, path.y);
		}

		if (a > TWO_PI * (leastCommonMultiple(r, R) / r)) {
			noLoop();
		}
		endShape();
	}
}

function leastCommonMultiple(min, max) {
	function range(min, max) {
		var arr = [];
		for (var i = min; i <= max; i++) {
			arr.push(i);
		}
		return arr;
	}

	function gcd(a, b) {
		return !b ? a : gcd(b, a % b);
	}

	function lcm(a, b) {
		return (a * b) / gcd(a, b);
	}

	var multiple = min;
	range(min, max).forEach(function (n) {
		multiple = lcm(multiple, n);
	});

	return multiple;
}