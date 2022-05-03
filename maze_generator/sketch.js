let rows, cols;
let w = 40;
let grid;
let he = 400;
let wi = 440;
let current, nextCell;
let astar;
let rowsInput, colsInput, speed;
let game;
let difficulté = 1;
let gameModeList = ["", "NONE", "VS", "LIMITED", "COUNTER"];
let gameMode = "";
let counter;
let minuteStart = false;
let minuteValue;
function setup() {
	createCanvas(windowWidth, windowHeight);
	speed = 10;
	// createCanvas(440, 400);
	cols = floor(width / w) - 7;
	rows = floor(height / w) - 5;
	//rows = 30;
	//cols = 30;
	x = width - 200;

	game = new Game(cols, rows, w);
	generateGUI();

}


function generateGUI() {
	rowsInput = createInput(rows, "number");
	rowsInput.position(x, 100);
	rowsInput.input(() => { rows = int(rowsInput.value()); game = new Game(cols, rows, w) });

	colsInput = createInput(cols, "number");
	colsInput.position(x, 120);
	colsInput.input(() => { cols = int(colsInput.value()); game = new Game(cols, rows, w) });

	wInput = createInput(w, "number");
	wInput.position(x, 140);
	wInput.input(() => { w = int(wInput.value()); game = new Game(cols, rows, w) });

	select = createSelect();
	select.position(x, 160);
	for (let mode of gameModeList) {
		select.option(mode);
	}
	select.changed(() => gameMode = select.value())

	buttonR = createButton('Résoudre');
	buttonR.position(x, 250);
	buttonR.mousePressed(() => game.astar.launch(game.grid.start));

	buttonA = createButton('Aide');
	buttonA.position(x, 270);
	buttonA.mousePressed(() => game.astar.launch(current));


}



function draw() {

	background(51);
	game.show();

	if (gameMode == "NONE" && game.astar.start) {
		game.astarNext();
	} else if (gameMode == "LIMITED") {
		text("Mouvement restant: " + str(game.counter), x, 400, x + 50, 425);
	} else if (gameMode == "COUNTER" && game.grid.finish) {
		if (minuteStart == false) {
			minuteValue = minute();
			minuteStart = true;
		} else {
			if ((minuteValue + 5) % 60 == minute()) {
				alert("you lose")
				game = new Game(cols, rows, w);
				minuteStart = false;
				gameMode = "";
			}
		}

	}


	let percentG = floor((100 * (game.grid.totalLength - game.grid.id.length)) / (game.grid.totalLength - 1));
	text("Génération: " + str(percentG) + "%", x, 200, x + 50, 250)

	let percentR = floor(100 * (game.grid.visitedCount) / (game.grid.totalLength - 1));
	text("Résolution: " + str(percentR) + "%", x, 225, x + 50, 275)

	if (current == game.grid.End) {
		game = new Game(cols, rows, w);
		current = undefined;
	}
}


function move(next) {

	if (next != undefined) {
		nextCell = next[0];
		!nextCell.visited1 ? game.grid.visitedCount++: null;
		current.current = false;
		nextCell.current = true;
		current = nextCell;
		
	}
	
}

function keyPressed() {
	if (key === "R") {
		game.reload();
	}
	if (keyCode === CONTROL && !game.astar.start && game.grid.finish) {
		console.log("launch")
		game.grid.clear();
		game.astar.launch(current);
	}
	if (game.grid.finish) {
		current.visited1 = true;
		current.visited = false;
		
		if (keyCode === UP_ARROW && !current.walls[0]) {
			next = current.getNeihbour(0);
			console.log(next.visited, next.visited1);
			move(next);
			
		} else if (keyCode === DOWN_ARROW && !current.walls[2]) {
			next = current.getNeihbour(2);
			move(next);
			
		} else if (keyCode === RIGHT_ARROW && !current.walls[1]) {
			next = current.getNeihbour(1);
			move(next);
			
		} else if (keyCode === LEFT_ARROW && !current.walls[3]) {
			next = current.getNeihbour(3);
			move(next);
			
		} else {
			return;
		}
		if (gameMode == "VS") {
			for (let i = 0; i < difficulté; i++) {
				game.astarNext();
			}
		} else if (gameMode == "LIMITED") {
			game.counter--;
			if (game.counter == 0) {
				alert("you lose");
			}

		}
	}
}