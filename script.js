
var myGamePiece;

function startGame() {
    myGamePiece = new component(90, 90, "robot copy.png", 10, 15, "image");
    myGameArea.start();
}

function drawGrid(w, h, id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    for (x = 0; x <= w; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    for (y = 0; y <= h; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
    var backgroundImage = new Image();
    backgroundImage.src = "grid frame.jpg";
    
    // Wait for the image to load
    backgroundImage.onload = function() {
      // Draw the background image on the canvas
      console.log("Background image loaded successfully.");
      ctx.drawImage(backgroundImage, 10,10, canvas.width, canvas.height);
    };
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 400;
        this.canvas.style.position="absolute";
        this.canvas.style.left="87px";
        this.canvas.style.top="242px";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        updateDisplay("Robot reached destination");
    }
}
function updateGameArea() {
    myGameArea.clear();
    // drawGrid(500, 400, "canvas"); // Redraw the grid on each frame
    myGamePiece.newPos();
    myGamePiece.update();
    if (myGamePiece.x >= myGameArea.canvas.width - myGamePiece.width && myGamePiece.y >= myGameArea.canvas.height - myGamePiece.height) {
        myGameArea.stop();
    }
}
// function updateDisplayMessage(message) {
//     display.value = message;
//   }
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX*10;
        this.y += this.speedY*10; 
        if (this.x === myGameArea.canvas.width - this.width && this.y === myGameArea.canvas.height - this.height) {
            myGameArea.stop();
        }       
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
        if (this.y >= myGameArea.canvas.height - this.height) {
            this.y = myGameArea.canvas.height - this.height;
        }

    }
}

function updateGameArea() {
    myGameArea.clear();
    // drawGrid(500, 400, "canvas"); // Redraw the grid on each frame
    myGamePiece.newPos();
    myGamePiece.update();
    
    if (myGamePiece.x >= myGameArea.canvas.width - myGamePiece.width && myGamePiece.y >= myGameArea.canvas.height - myGamePiece.height) {
        myGameArea.stop();
    }
   
}

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const display = document.getElementById('freeform');

let pressedKeys = [];

function updateDisplay() {
  display.value = pressedKeys.join('\n');
}

leftButton.addEventListener('click', function() {
  pressedKeys.push('Left Key is pressed');
  updateDisplay();
});

rightButton.addEventListener('click', function() {
  pressedKeys.push('Right Key is pressed');
  updateDisplay();
});

upButton.addEventListener('click', function() {
  pressedKeys.push('Up Key is pressed');
  updateDisplay();
});

downButton.addEventListener('click', function() {
  pressedKeys.push('Down Key is pressed');
  updateDisplay();
});
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', function() {
  pressedKeys = [];
  updateDisplay();
});

function updateDisplay() {
    if (myGamePiece.x >= myGameArea.canvas.width - myGamePiece.width && myGamePiece.y >= myGameArea.canvas.height - myGamePiece.height) {
        display.value = pressedKeys.concat("Robot reached destination").join('\n');
      } else {
        display.value = pressedKeys.join('\n');
      }
}


