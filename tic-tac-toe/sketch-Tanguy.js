
let grid = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

let w, h;
let ia = new Intelligence(2);
let iaP1 = new Intelligence(1);
let auto = true;
let P1auto = false;

const etats = {
	IDLE: "idle",
	PLAYER1: "joueur1",
	PLAYER2: "joueur2",
	FINISH: "finish"
}
let nbGame = 0;
let maxGame  = 2000;
let p1 = 0;
let p2 = 0;
let etat = etats.IDLE
let win;
function setup() {
	createCanvas(800, 600);
	// background(51);
	w = (width - 10) / 3;
	h = (height - 10) / 3;
	etat = etats.PLAYER2;
}

function draw() {
	if (!P1auto) {
		background(51);
		stroke(255);

		for (let x = 0; x < (width - 10); x += w) {
			for (let y = 0; y < (height - 10); y += h) {
				strokeWeight(1);
				line(x, 0, x, height - 10);
				line(0, y, width - 10, y);
			}
		}
		line(width - 10, 0, width - 10, height - 10);
		line(0, height - 10, width - 10, height - 10);


		for (let col = 0; col < grid.length; col++) {
			for (let row = 0; row < grid[col].length; row++) {

				if (grid[col][row] != 0) {
					push();
					let xcenter = (col * w) + (w / 2);
					let ycenter = (row * h) + (h / 2);


					if (grid[col][row] == 1) {
						fill(255, 0, 0);
						rectMode(CENTER);
						rect(xcenter, ycenter, 20, 20);

					} else if (grid[col][row] == 2) {
						fill(0, 0, 255);
						ellipseMode(CENTER);
						ellipse(xcenter, ycenter, 20, 20);

					}

					pop();
				}
			}
		}
	}

	let winner = checkWon();
	if (winner != undefined && etat != etats.IDLE && etat != etat.FINISH) {
		etat = etats.FINISH;
		win = winner;
		nbGame++;
	}
	if (etat == etats.FINISH || etat == etats.IDLE) {

		push();
		textSize(32);
		translate(width / 2, height / 2);
		stroke(255);
		textAlign(CENTER)

		if (win == 1) {
			fill(255, 0, 0);
			text(etats.PLAYER1 + " a gagne", 0, 0);

			if (etat == etats.FINISH) {
				console.log(etat)
				p1++;
				if (auto) {
					ia.lose();
				} else if (P1auto) {
					iaP1.won();
				}
				etat = etats.IDLE;
			}
		}


		if (win == 2) {
			fill(0, 0, 255);
			text(etats.PLAYER2 + " a gagne", 0, 0);
			// console.log("P2 a gagné");
			if (etat == etats.FINISH) {
				p2++;
				if (auto) {
					ia.won();
				} else if (P1auto) {
					iaP1.lose();
				}
				etat = etats.IDLE;
			}
		}

		if (win == 0) {
			fill(0, 255, 0);
			text("egalite", 0, 0);
			if (auto && etat == etats.FINISH) {
				ia.clearBrainPath();
				iaP1.clearBrainPath();
				etat = etats.IDLE;
			}

		}

		fill(255, 0, 0);
		text(str(p1), -20, 50);

		fill(0, 0, 255);
		text(str(p2), 20, 50);
		pop();

	}

	if (auto && etat == etats.PLAYER2) {
		
		grid = ia.getMove(grid);
		etat = etats.PLAYER1;

	}

	if (P1auto && etat == etats.PLAYER1) {
		grid = iaP1.getMove(grid);
		etat = etats.PLAYER2;

	}

	if (nbGame >= maxGame) {
		P1auto = false;
	}

	if (etat == etats.IDLE && P1auto) {
		etat = etats.PLAYER2;
		grid = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
	};
// noLoop();v
}

function trainX(nb){
	P1auto = true;
	nbGame = 0;
	maxGame = nb;
}

function mouseClicked() {
	if (etat == etats.IDLE) {
		etat = etats.PLAYER2;
		grid = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
	};


	let x = Math.floor(mouseX / w);
	let y = Math.floor(mouseY / h);
	// console.log(x, y);

	if (x > 2 || y > 2) {
		console.log("x too big");
		return;
	}

	if (grid[x][y] == 0) {
		if (etat == etats.PLAYER1) {
			etat = etats.PLAYER2;
			grid[x][y] = 1;
		} else if (etat == etats.PLAYER2 && !auto) {
			etat = etats.PLAYER1;
			grid[x][y] = 2;

		}
	} else {
		console.warn("this case is not empty");
	}

}

function checkWon() {
	for (let i = 0; i < 3; i++) {
		let colCheck = grid[i];
		if (colCheck[0] == colCheck[1] && colCheck[0] == colCheck[2]) {
			if (colCheck[0] != 0) {
				return colCheck[0];
			}
		}
		if (grid[0][i] == grid[1][i] && grid[0][i] == grid[2][i]) {
			if (grid[0][i] != 0) {

				return grid[0][i];
			}
		}
	}

	if (grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2]) {
		if (grid[0][0] != 0) {

			return grid[0][0];

		}
	}

	if (grid[0][2] == grid[1][1] && grid[2][0] == grid[0][2]) {
		if (grid[0][2] != 0) {

			return grid[0][2];
		}
	}

	for (let row of grid) {
		for (let col of row) {
			if (col == 0) {
				return
			}
		}
	}

	// console.log("egalité");
	return 0;

}