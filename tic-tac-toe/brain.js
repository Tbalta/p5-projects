class Brain {
    constructor(grid) {
        this.moves = [];
        this.lastMove;
        // console.log(grid)

        for (let x = 0; x < grid.length; x++) {
            // console.log("turn");
            for (let y = 0; y < grid[x].length; y++) {

                if (grid[x][y] == 0) {
                    // console.log(grid[x][y]);
                    this.moves.push([x, y]);
                }
            }
        }
    }

    pickRandomMoves() {
        this.lastMove = random(this.moves);
        // console.log(this.lastMove);
        return this.lastMove;
    }

    lose() {
        const result = this.moves.filter(word => word != this.lastMove);
        this.moves = result;
        return result == [];
    }

    won() {
        // this.moves.push(this.lastMove);
    }
}