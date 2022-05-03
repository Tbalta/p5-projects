class Cell {
    constructor(x, y, w, id, parent) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.walls = [true, true, true, true]; //nord, Est Sud Ouest
        this.visited = false;
        this.visited1 = false;
        this.grid = parent;
        this.col = color(0, 0, 255);
        this.id = id;
        this.uniqueID = id;
        this.current = false;
        this.prevID = undefined;
        this.cost = 0;
        this.heuristic = 0;
        this.inThePath = false;
        this.parentCell;
        this.best = false;
        this.astarCurrent = false;
    }

    getRandomWall() {
        return floor(random(this.walls.length));
    }


    getValidNeighbour() {
        let toReturn = [];
        let x = this.x;
        let y = this.y;
        let getCell = (x, y) => this.grid.getCellAt(x, y);
        if (this.y != 0 && !this.walls[0] && !getCell(x, y - 1).visited) { //NORD
            toReturn.push(getCell(x, y - 1));
        }
        if (this.x != this.grid.cols - 1 && !this.walls[1] && !getCell(x + 1, y).visited) { //EST
            toReturn.push(getCell(x + 1, y))
        }

        if (this.y != this.grid.rows - 1 && !this.walls[2] && !getCell(x, y + 1).visited) { //SUD
            toReturn.push(getCell(x, y + 1));
        }
        if (this.x != 0 && !this.walls[3] && !getCell(x - 1, y).visited) { //OUEST
            toReturn.push(getCell(x - 1, y));
        }
        //console.log(toReturn);
        return toReturn;
    }


    hasUnvisitedNeighboor() {
        let x = this.x;
        let y = this.y;
        let getCell = (x, y) => this.grid.getCellAt(x, y);
        if (this.y != 0 && !this.walls[0] && !getCell(x, y - 1).visited) { //NORD
            console.log("1")
            return true;
        }
        if (this.x != this.grid.cols - 1 && !this.walls[1] && !getCell(x + 1, y).visited) { //EST
            console.log("2")
            return true;
        }
        
        if (this.y != this.grid.rows - 1 && !this.walls[2] && !getCell(x, y + 1).visited) { //SUD
            console.log("3")
            return true;
        }
        if (this.x != 0 && !this.walls[3] && !getCell(x - 1, y).visited) { //OUEST
            console.log("4")
            return true;
        }
        //console.log(toReturn);
        return false;
    }

    getNeihbour(index) {
        let indice, nextCell;
        switch (index) {
            case 0:
                if (this.y != 0) {
                    nextCell = this.grid.getCellAt(this.x, this.y - 1);
                    indice = 2;
                }
                break;
            case 1:
                if (this.x != this.grid.cols - 1) {
                    nextCell = this.grid.getCellAt(this.x + 1, this.y);
                    indice = 3;
                }
                break;
            case 2:
                if (this.y != this.grid.rows - 1) {
                    nextCell = this.grid.getCellAt(this.x, this.y + 1);
                    indice = 0;
                }
                break;
            case 3:
                if (this.x != 0) {
                    nextCell = this.grid.getCellAt(this.x - 1, this.y);
                    indice = 1;
                }
                break;
            default:
                nextCell = undefined
                console.log(index + "is invalid")
                break;
        }

        return nextCell != undefined ? [nextCell, indice] : undefined;

    }

    removeWall(index = this.getRandomWall()) {
        let result = this.getNeihbour(index);


        if (result != undefined) {
            let nextCell = result[0];
            let wallIndex = result[1];
            //console.log(nextCell, this);
            if (this.id != nextCell.id) {
                // console.log("not parent or not result")
                this.walls[index] = false;
                nextCell.walls[wallIndex] = false;

                this.prevID = nextCell.id;
                this.grid.getCellByID(nextCell.id).map(x => x.id = this.id);


                this.col = color(255, 0, 0);
                nextCell.col = color(255, 0, 0);

            }
        }



    }

    show() {
        let w = this.w;
        let x = this.x * w;
        let y = this.y * w;
        this.Ccolor();
        //noStroke();
        //fill(0);
        // textAlign(LEFT, CENTER)
        //text(str(this.cost), x+20, y+20, this.w+20, this.w+20 );
        noFill();
        stroke(255);
        
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x, y + w, x + w, y + w);
        }
        if (this.walls[3]) {
           line(x, y, x, y + w);
        }
    }

    Ccolor() {
        let x = this.x * w;
        let y = this.y * w;
        let percent = 0.3;
        if (this.current) {
            fill(0, 0, 255);
            noStroke();
            // rect(x + percent * w, y + percent * w, this.w - percent * w, this.w - percent * w);
            rect(x + 3, y + 3, this.w - 6, this.w - 6);

        } else if (this.astarCurrent) {
            fill(230, 70, 30);
            noStroke();
            // rect(x + percent * w, y + percent * w, this.w - percent * w, this.w - percent * w);

        } else if (!this.grid.finish) {
            fill(255, map(this.id, 0, this.grid.cells.length, 0, 255), 255)
            noStroke()
            rect(x, y, this.w, this.w);
            return;
        } else if (this == this.grid.End) {
            fill(255, 0, 0)
            noStroke()
            rect(x + 2, y + 2, this.w - 4, this.w - 4);
            return;
            // rect(x + percent * w, y + percent * w, this.w - percent * w, this.w - percent * w);
        } else if (this == this.grid.start) {
            fill(0, 255, 0)
            noStroke()
            // rect(x, y, this.w - (percent * w), this.w - (percent * w));
            rect(x + 2, y + 2, this.w - 4, this.w - 4);
            return;
        } else if (this.best) {
            fill(100, 255, 0)
            noStroke()
            // rect(x + percent * w, y + percent * w, this.w - percent * w, this.w - percent * w);
        } else if (this.inThePath) {
            fill(255, 230, 50);
            noStroke();
            // rect(x + percent * w, y + percent * w, this.w - percent * w, this.w - percent * w);

        } else if (this.visited1) {
            fill(10, 200, 150);
            noStroke();
            // rect(x + percent * w, y + percent * w, this.w - percent * w, this.w - percent * w);

        } else if (this.visited) {
            fill(0, 255, 255);
            noStroke();
            // rect(x + percent * w, y + percent * w, this.w - percent * w, this.w - percent * w);
        } else {
            return;
        }
        rect(x + 5, y + 5, this.w - 10, this.w - 10);
    }


}