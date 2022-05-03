class Intelligence {
    constructor() {
        this.knowed = [];
        this.brainPath = [];
    }

    getMove(grid) {
        if (grid in this.knowed == false) {
            // console.log("new Brain")
            this.knowed[grid] = new Brain(grid);
        }
        let brain = this.knowed[grid];
        // console.log(brain);
        this.brainPath.push(brain);

        return brain.pickRandomMoves();
    }

    lose() {
        let brain = this.brainPath[this.brainPath.length - 1];
        if (brain) {
            if (brain.lose()) {
                this.lose();
            }
        }
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