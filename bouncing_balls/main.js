// setup canvas
const success = document.querySelector(".success-container");
const resetBtn = document.querySelector(".reset");
const scoreTag = document.querySelector(".score");
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

resetBtn.onclick = () => {
    resetGame();
}

// Push balls into center on resize and adjust canvas dimensions
window.onresize = () => {
    changeWidth = width - window.innerWidth;
    changeHeight = height - window.innerHeight;

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    for (let i = 0; i < balls.length; i++) {
        if (changeWidth > 0) {
            if(balls[i].x > width/2) {
                balls[i].x -= changeWidth;
            } 
            else {
                balls[i].x += changeWidth;
            }    
        }
        if (changeHeight > 0) {
            if(balls[i].y > height/2) {
                balls[i].y -= changeHeight;
            } 
            else {
                balls[i].y += changeHeight;
            }    
        }
        
    }
}

// Utility functions
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function updateScore() {
    let score = 0;
    for (let i = 0; i < balls.length; i++) {
        if (!balls[i].exists){
            score++;
        }
        
    }
    scoreTag.textContent = `Score: ${score} | ${balls.length}`;

    if (score === balls.length) {
        success.classList.remove("hidden");
    }
}

function resetGame() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].exists = true;
    }
    success.classList.add("hidden");
}

// Shapes
class Shape {
    constructor(x, y, velX, velY, exists){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = true;
    };
}

class Ball extends Shape {
    constructor(x, y, velX, velY, exists, color, size){
        super(x, y, velX, velY, exists);
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
            if (!(this === balls[j] && balls[j].exists)) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = randomRGB();
                }
            }
        }
    };
}

class EvilCircle extends Shape {
    constructor(x, y, exists){
        super(x, y, 20, 20, exists)
        this.color = "white";
        this.size = 15;
    };
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.size, 0, 2 *  Math.PI);
        ctx.stroke();
    };
    checkBounds(){
        if ((this.x + this.size) >= width) {
            this.x -= this.size * 0.9;
        }
        if ((this.x - this.size) <= 0) {
            this.x += this.size * 0.9;
        }
        if ((this.y + this.size) >= height) {
            this.y -= this.size * 0.9;
        }
        if((this.y - this.size) <= 0) {
            this.y += this.size * 0.9;
        }
    };
    setControls(){
        let _this = this;
        window.onkeydown = function(e) {
            if (e.key === 'a') {
            _this.x -= _this.velX;
            } else if (e.key === 'd') {
            _this.x += _this.velX;
            } else if (e.key === 'w') {
            _this.y -= _this.velY;
            } else if (e.key === 's') {
            _this.y += _this.velY;
            }
        }
    };
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j].exists) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                    updateScore();
                }
            }
        }
    };
}

// Create Ball objects
let balls = [];
while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position is alwyas one ball width away from edge to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, -7),
        true,
        randomRGB(),
        size
    );
    balls.push(ball);
}

// Create EvilCircle object
let evilCircle = new EvilCircle(
    random(50, width - 50),
    random(50, height - 50),
    true
);
evilCircle.setControls();

// Initialize Score
scoreTag.innerText = `Score: 0 | ${balls.length}`

// Game loop
function loop() {
    ctx.fillStyle = "rgba(17,17,17,17.7)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
        evilCircle.draw();
        evilCircle.checkBounds();
        evilCircle.collisionDetect();
    }
    requestAnimationFrame(loop);
}

loop();