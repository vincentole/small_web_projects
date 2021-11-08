// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Utility functions
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball
class Ball{
    constructor(x, y, velX, velY, color, size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    };
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 *  Math.PI);
        ctx.fill();
    };
    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        if((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        
        this.x += this.velX;
        this.y += this.velY;
    };
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = randomRGB();
                    this.velX = -(this.velX);
                    this.velY = -(this.velY);
                    balls[j].velX = -(balls[j].velX);
                    balls[j].velY = -(balls[j].velY);
                }
            }
        }
    };
}


let balls = [];
while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position is alwyas one ball width away from edge to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, -7),
        randomRGB(),
        size
    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = "rgba(17,17,17,17.7)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}

loop();