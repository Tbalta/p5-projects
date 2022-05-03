class Intelligence {
    constructor(joueur) {
        this.joueur = joueur;
        this.knowed = [];
        this.brainPath = [];
    }

    getMove(grid) {

        //Grid rotate
        let dejaVu = false;
        for (let tour = 0; tour < 4 || false; tour++) {

            let ret = [
                [0, 0, 0],
                [0, 0, 0],
                [1, 0, 0]
            ];




            for (let i = 0; i < 3; ++i) {
                for (let j = 0; j < 3; ++j) {
                    ret[i][j] = grid[3 - j - 1][i];
                }
            }
            // console.log(grid, ret);
            grid = ret;

            console.log(!dejaVu);
            if (grid in this.knowed == true && !dejaVu) {
                // console.log("new Brain")
                if (tour != 0) {
                    console.log("found with " + tour + " rotation");
                }
                dejaVu = true;
                let brain = this.knowed[grid];
                this.brainPath.push(brain);
                let move = brain.pickRandomMoves();

                if (move) {
                    grid[move[0]][move[1]] = this.joueur
                } else {
                    this.noMove();
                    console.warn("no move available");
                }

            }

        }
        if (dejaVu) {
            return grid;
        }

        let brain = new Brain(grid);
        this.knowed[grid] = brain;
        this.brainPath.push(brain);
        console.log("unknown");
        let move = brain.pickRandomMoves();
        // console.log(move);
        if (move != undefined) {
            console.log(move);
            grid[move[0]][move[1]] = this.joueur;

        } else {
            this.noMove();
            console.warn("move undefined")
        }

        // console.log(grid);
        return grid;

    }

    lose() {
        let getBrain = i => this.brainPath[this.brainPath.length - i];

        let makeLose = i => {
            if (i > 0) {
                let brain = getBrain(i);
                if (!brain.lose()) {
                    console.log("recursively punishing");
                    makeLose(i - 1);
                }
            }
        }
        makeLose(1);
        this.brainPath = [];
    }

    won() {
        for (let brain of this.brainPath) {
            brain.won();
        }

        this.brainPath = [];
    }
    clearBrainPath() {
        this.brainPath = [];
    }

    noMove() {
        let brain = this.brainPath[this.brainPath - 1];
        const result = this.knowed.filter(word => word != brain);
        this.knowed = result;
    }

}