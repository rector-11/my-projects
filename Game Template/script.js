const canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = window.innerWidth
let height = window.innerHeight
let keys = []
let player = {
    x: width/2,
    y: height/2,
    color: "red"
}


canvas.width = width;
canvas.height = height;

function drawPlayer(){ 
    //player color
    ctx.fillStyle = player.color
    //new path
    ctx.beginPath(); 
    //define arc (circle size and dimensions)
    ctx.arc(player.x, player.y, 10, 0, 2 * Math.PI); 
    //fill in 
    ctx.fill(); 

    //drawing outline of circle
        // ctx.lineWidth = 2; // Set line width for the outline
        // ctx.strokeStyle = 'black'; // Set stroke color for the outline
        // ctx.stroke(); // Draw the outline
}

function drawTriangle() {
  ctx.moveTo(200, 50); // Move to the top point (x, y)
  ctx.lineTo(350, 350); // Draw a line to the bottom-right point
  ctx.lineTo(50, 350); // Draw a line to the bottom-left point

  // Close the path to connect the last point back to the first
  ctx.closePath();

  // (Optional) Add styling for the triangle
  ctx.fillStyle = 'orange';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
}



(function update() { 
    //check keys pressed
        //up arrow/w
            if (keys[87] || keys[38]) {
                player.y = player.y - 10
            }
        //down arrow/s
            if (keys[83] || keys[40]) {
                player.y = player.y + 10
            }
        //right arrow/d
            if (keys[68] || keys[39]) {
                player.x = player.x + 10
            }
        //left arrow/a
            if (keys[65] || keys[37]) {
                player.x = player.x - 10
            }
        //physics

        //check player in boundaries
            
    //clear all drawing code
    ctx.clearRect(0,0, width, height);   
    drawPlayer()  
    setTimeout(update, 1000/60) 
}());


document.onkeydown = document.onkeyup = function(e) {
  keys[e.keyCode] = e.type === "keydown";
};