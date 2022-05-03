class Game {

    constructor(cols, rows, w) {
        this.cols = cols;
        this.rows = rows;
        this.w = w;
        this.grid = new Grid(cols, rows, w);
        this.counter = floor((cols + rows) * 2.5);
        this.astar = new Astar(0, 0, this.grid);
    }


    reload(cols = this.cols, rows = this.rows, w = this.w) {
        this.cols = cols;
        this.rows = rows;
        this.w = w;

        this.grid = new Grid(cols, rows, w);
        //console.log(cols, rows, cols*rows, this.grid.id)
        this.astar = new Astar(0, 0, this.grid)
    }




    astarNext() {
        if (this.astar.start && !this.astar.isFinished()) {
            // console.log("start")
            this.astar.evaluateNextCell();
            this.astar.pickCell();
            for (let cell of this.astar.path) {
                cell.inThePath = true;
                current.current = true;
            }
            this.astar.isFinished();
        }

    }

    show() {
        let speed = 50;
        if (this.grid.id.length != 1) {
            // truc = grid.getRandomCell()
            for (let i = 0; i < speed; i++) {
                let truc = this.grid.getRandomCellByID();

                if (truc != undefined) {
                    truc.removeWall();
                    this.grid.id = this.grid.id.filter(item => truc.prevID != item);
                } else {
                    console.warn("One cell have encounter error at:")
                    console.warn(liste, truc, ranid)
                    this.grid.id = this.grid.id.filter(item => ranid != item);
                }
            }
        } else {
            if (!this.grid.finish) {
                this.grid.finish = true;
                current = this.grid.start;
                console.log("grid is finished");
                console.log(this.grid.finish)
            }

        }
        for (let cell of this.grid.cells) {
            cell.show();
        }


    }


}