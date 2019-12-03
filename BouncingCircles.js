var canvas = document.querySelector("canvas"); //get canvas element
canvas.width = window.innerWidth; //set canvas width
canvas.height = window.innerHeight; //set canvas height
var c = canvas.getContext('2d'); //access to function that helps create shape
var circleArray = []; //array to store circles generated
var ball; //handle single circle instances
var gravity = 0.5; //gravity on ball
var bounce = 0.8; //ball bounce factor
var friction = 0.9;

var colorArray = [ //array of random colours to populate ball
    '#7123e7',
    '#1f4301',
    '#97788a',
    '#c15b1b',
    '#075f2c',
];

window.addEventListener('resize', function () { //function that triggers when browser window is re-sized
    canvas.width = window.innerWidth; //resize canvas width
    canvas.height = window.innerHeight; //resize canvas height
});

canvas.addEventListener('click', function (event) { //click event that triggers circle creation
    var randomx = (Math.random() - 0.5) * 3; //generate random horizontal speed
    var randomy = (Math.random() - 0.5) * 10; //generate random vertical speed
    var adjustMousePos = this.getBoundingClientRect(),
        x = event.clientX - adjustMousePos.left,
        y = event.clientY - adjustMousePos.top;
    circleArray.push(new Circle(x, y, randomx, randomy, 10)); //add new circle object to array
});

animate();//triggers animation

function Circle(x, y, dx, dy, radius) { //setting Circle using object
    this.x = x; //set x position
    this.y = y; //set y position
    this.dx = dx; //set x speed
    this.dy = dy; //set y speed
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]; // choose random colour for array
}

Circle.prototype = { //prototype created so you can create separate circle objects
    draw: function () {
        c.beginPath(); //stops from connecting with line
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //outline
        c.fillStyle = this.color; //colouring circle one of random colours
        c.fill(); //colour circle
        c.stroke(); //draw circle
        this.update(); //call update once circle is drawn
    },
    update: function () {

        if (this.x + this.radius + this.dx > innerWidth || this.x - this.radius <= 0) { //check to see if ball is close to vertical boundary
            this.dx = -this.dx * friction;
        }

        if (this.y + this.radius + this.dy > innerHeight || this.y - this.radius <= 0) { //check to see if ball is close to horizontal boundary
            this.dy = -this.dy * bounce; //ball bounces back up less than last bounce
        }
        else {
            this.dy += gravity; //ball accelerating down while in within canvas bounds
        }
        this.x += this.dx; //keeps ball moving left to right
        this.y += this.dy; //keeps ball moving down
    },

};

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight); //clears circle so there is no trail of circle being drawn

    for (var i = 0; ball = circleArray[i]; i++) { //assigns ball to circle array element
        ball.draw(); //draw ball each time object is created
    }
    requestAnimationFrame(animate); //animation loop
}




