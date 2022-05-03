const gridH = 50;
const gridW = 50;

const res = 10;

// enumeration of all directions available.
const directions = {
	NORTH: "n",
	EAST: "e",
	SOUTH: "s",
	WEST: "w",
}

// list containing the position of "apple"
let consumables = []
// List containig the position of each part of the snake.
let snake = [];
// Current direction of the snake.
let snakedirection = directions.EAST;

// This function is called once the page is loaded.
function setup() {
	createCanvas(gridH * res, gridW * res);
	background(51);
	snake.push({ x: gridW / 2, y: gridH / 2 });
	frameRate(10);
	setInterval(addConsumable, 5000);
}

function randomVar(x) {
	return Math.floor(Math.random() * x);
}

function addConsumable() {
	consumables.push({ x: randomVar(gridW), y: randomVar(gridH) });
}

function draw() {
	background(51);
	for (consumable of consumables) {
		fill(255, 0, 0);
		rect(consumable.x * res, consumable.y * res, res, res);
	}
	for (bodypart of snake) {
		fill(255);
		rect(bodypart.x * res, bodypart.y * res, res, res);

	}
	snakeHead = snake[snake.length - 1];
	let index = consumables.findIndex(elemt => elemt.x == snakeHead.x && elemt.y == snakeHead.y);
	if (index != -1) {
		consumables.splice(index, 1);
	} else {
		snake.shift();		
	}
	index = snake.findIndex(elemt => elemt.x == snakeHead.x && elemt.y == snakeHead.y);
	if(index != -1 && index != snake.length-1){
		console.log("perdu");
		noLoop();
	}
	switch (snakedirection) {
		case directions.NORTH:
			snake.push({ x: snakeHead.x, y: snakeHead.y - 1 });
			break;
		case directions.EAST:
			snake.push({ x: snakeHead.x + 1, y: snakeHead.y });
			break;
		case directions.SOUTH:
			snake.push({ x: snakeHead.x, y: snakeHead.y + 1 });
			break;
		case directions.WEST:
			snake.push({ x: snakeHead.x - 1, y: snakeHead.y });
			break;
	}
	if(snakeHead.x < 0 || snakeHead.x > gridW || snakeHead.y < 0 || snakeHead.y > gridW){
		console.log("perdu");
		noLoop();
	}

}



function keyPressed() {
	if (keyCode === LEFT_ARROW && snakedirection != directions.EAST) {
		snakedirection = directions.WEST;
	} else if (keyCode === RIGHT_ARROW  && snakedirection != directions.WEST) {
		snakedirection = directions.EAST;
	} else if (keyCode === UP_ARROW  && snakedirection != directions.SOUTH) {
		snakedirection = directions.NORTH;
	} else if (keyCode == DOWN_ARROW  && snakedirection != directions.NORTH) {
		snakedirection = directions.SOUTH;
	}
}