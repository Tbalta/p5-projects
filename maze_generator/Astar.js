class Astar {
    constructor(x, y, grid) {
        this.x = x;
        this.y = y;
        this.currentCell = grid.getCellAt(this.x, this.y);
        this.startCell;
        this.grid = grid;
        this.path = [];
        this.validCells = [];
        this.queue = [];
        this.start = false;
        this.bestPathCell = undefined;
        this.unusedPaths = [];
    }

    launch(cell) {
        this.grid.clear();
        this.currentCell = cell;
        this.startCell = cell;
        this.start = true;
        this.path = [];
        this.queue.push(cell)
        console.log(this.queue)
    }

    pickCell2() {
        let cellTop = this.queue.pop();
        console.log(cellTop);
        cellTop.visited = true;
        if (cellTop == this.grid.End) {
            let child = cellTop.parentCell;
            while (child != this.grid.start) {
                this.path.push(child);
                child = child.parentCell;
            }
            this.astar.start = false;
            this.astar.current = this.grid.End

        } else if (cellTop.getValidNeighbour().length > 0) {
            console.log("voisins")
            let voisins = cellTop.getValidNeighbour();
            for (let voisin of voisins) {
                voisin.parentCell = cellTop;
            }
            this.queue = this.queue.concat(voisins)
        }

    }


    getBestPathCell() {
        // let prev = this.path[0];
        // this.bestPathCell = undefined;
        // if (this.bestPathCell != undefined) this.bestPathCell.best = false;
        // for (cell of this.path) {
        //     //console.log(prev.cost);
        //     // console.log(prev.cost > cell.cost, cell.hasUnvisitedNeighboor())
        //     if (this.evaluateCell(cell) < this.evaluateCell(prev) && cell.hasUnvisitedNeighboor()) {
        //         this.bestPathCell = cell;
        //         console.log("newBestCell")
        //     }

        // }
        // if (this.bestPathCell != undefined) this.bestPathCell.best = true;
    }



    evaluateCell(cell) {
        if (cell != undefined) {
            let end = this.grid.End;
            let distance = (abs(cell.x - this.grid.End.x) + abs(cell.y - this.grid.End.y));
            // let distance = floor(sqrt((end.x - cell.x) ^ 2 + (end.y - cell.y) ^ 2));
            cell.cost = distance;
            return cell.cost;
        }
    }


    evaluateNextCell() {
        this.validCells = this.currentCell.getValidNeighbour()
        let distance;
        if (this.validCells.length > 0) {
            for (let cell of this.validCells) {
                // distance = abs(cell.x - this.grid.End.x) + abs(cell.y - this.grid.End.y) //distance de Manhattan
                // console.log("distance: " + str(distance));
                // cell.cost = distance;
                this.evaluateCell(cell)
            }
        }

        // distance = abs(this.currentCell.x - this.grid.End.x) + abs(this.currentCell.y - this.grid.End.y) //distance de Manhattan
        distance = this.evaluateCell(this.currentCell) //distance de Manhattan
        this.currentCell.cost = distance;
    }

    getNextCell() {
        console.log("getting next cell")
        let nextCell = undefined;
        if (this.validCells.length > 0) { //si la cellule actuelle a des voisins libres
            // console.log("valid cell")
            nextCell = this.validCells[0];

            for (let cell of this.validCells) {
                if (cell.cost < nextCell.cost) {
                    nextCell = cell;
                }
            }

        } else if (this.path.length > 0) { //si la cellule n'as pas de voisin libre on recule

            console.log("pas assez de voisin")

            let pathLength = this.path.length - 1;

            // if (this.path[pathLength].hasUnvisitedNeighboor()) {
            //     nextCell = this.path[pathLength];
            //     return nextCell;
            // }

            let pop = this.path.pop()
            pop.inThePath = false;
            pop = this.path.pop()
            return pop;





        } else { // si on ne peut plus reculer on redémarre
            console.log("restart")
            nextCell = this.startCell;
        }
        return nextCell;
    }

    unusedADD(storepath) {
        for (let path1 of this.unusedPaths) {
            if (storepath[storepath.length - 1] == path1[path1.length - 2]) {
                path1.pop();
                console.log("unused paths updated", this.unusedPaths);
                return;
            }
        }


        this.unusedPaths.push([...storepath]);
        // this.unusedPaths.push([1, 2, 3]);
        console.log("unused path added", this.unusedPaths);

    }


    pickCell() {

        let nextCell = this.getNextCell();


        if (nextCell != undefined) {
            let pat = this.path;
            let best = this.bestPathCell;
            // if (this.bestPathCell != undefined && this.bestPathCell.cost < nextCell.cost - 1 && pat.indexOf(best) < pat.length-2) { //on utilise le checkpoint


            //     console.log("using check point");
            //     this.unusedADD(this.path) //on sauvegarde le chemin effectuer pour le retrouver au cas où
            //     let cellIndex = this.path.indexOf(this.bestPathCell) //index de la meilleur cellule
            //     this.path = this.path.slice(cellIndex + 1, this.path.length);
            //     nextCell = this.path[this.path.length - 1];
            //     console.log("current path modified", this.path);




            //     if (this.path.length > 1) {
            //         // console.log("best Path used")

            //         // this.unusedADD(this.path);
            //         // let pop = this.path.pop();
            //         // pop.inThePath = false;
            //     } else if (!this.path.length > 0 && this.unusedPaths.length > 0) {
            //         this.path = [...this.unusedPaths.shift()];
            //         console.log("current path modified", this.path);
            //         // console.log(this.unusedPaths.shift());
            //     }
            // }
            this.path.push(nextCell);
            this.currentCell.visited = true;
            if (!nextCell.inThePath) {
                this.grid.visitedCount++;
            }
            this.currentCell.astarCurrent = false;
            this.currentCell = nextCell;
            //console.log(nextCell)
            this.currentCell.astarCurrent = true;
            this.getBestPathCell();
        } else {
            console.warn("next cell is undefined")
        }
        // console.log("Current is");
        // console.log(this.currentCell);
    }

    isFinished() {
        if (this.grid.finish) {
            this.start = this.currentCell != this.grid.End;
            return this.currentCell == this.grid.End;
        }
        return false;
    }



}