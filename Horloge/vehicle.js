class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 8; //taille
        this.maxSpeed = 10;
        this.maxForce = 1;
    }

    show() {
        stroke(255);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y)
    }

    update() {
        // console.log(dist(mouseX, mouseY, this.pos.y, this.pos.y));
        this.pos.add(this.vel);
        this.vel.add(this.acc)
        this.acc.mult(0)
    }




    behaviors() {

        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);



        this.applyForce(arrive);
        this.applyForce(flee);
    }

    applyForce(force) {
        this.acc.add(force)
    }

    flee(target) {
        var desired = p5.Vector.sub(target, this.pos)
        var d = desired.mag();
        if (d<100){
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce)
        return steer;
        } else{
            return createVector(0, 0)
        }
    }

    arrive(target) {
        var desired = p5.Vector.sub(target, this.pos)
        var d = desired.mag();
        var speed = this.maxSpeed;
        if (d < 50) {
            speed = map(d, 0, 100, 0, this.maxSpeed)
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce)
        return steer;
    }
}