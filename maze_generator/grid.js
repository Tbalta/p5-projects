class Grid {
    constructor(cols, rows, w) {
        this.cols = cols;
        this.rows = rows;
        this.w = w;
        this.cells = [];
        this.finish = false
        this.visitedCount = 0;
        this.id = [];


        let index = 0;
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                let cell = new Cell(i, j, this.w, index, this);
                this.cells.push(cell);
                //console.log("new cell with id:"+index)
                this.id.push(index);
                index++;
            }
        }
        //console.log(this.id)
        // console.log(this.id.pop())
        this.totalLength = this.id.length;

        // this.End = this.getRandomCell()
        // this.start = this.getRandomCell()

        this.start = this.getCellAt(0, 0)
        this.End = this.getCellAt(cols - 1, rows - 1)
    }

    getRandomCell(arr = this.cells) {
        return random(arr);
    }

    getRandomCellByID() {
        let randomID = random(this.id);
        let liste = this.getCellByID(randomID);
        let cell = this.getRandomCell(liste);
        return cell;

    }

    getCellAt(x, y) {
        let index = this.cols * y + x
        if (index < this.cells.length) {
            return this.cells[index];
        } else {
            console.log(index + ">" + this.cells.length)
            return undefined;
        }
    }

    allID() {
        let arr = [];
        for (cell of this.cells) {
            if (!arr.includes(cell.id)) {
                arr.push(cell.id);
            }
        }
        return arr;
    }

    getCellByID(id) {
        let result = this.cells.filter(item => item.id == id);
        return result;
    }

    clear() {
        this.visitedCount = 0;
        for (let cell of this.cells) {
            cell.visited = false;
            cell.inThePath = false;
            cell.current = false;
        }
    }

}