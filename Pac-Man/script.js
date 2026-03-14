let boardCanvas = document.getElementById("boardCanvas");
let ctx = boardCanvas.getContext("2d");
let character = document.getElementById("character");
let inkyGhost = document.getElementById("inky");
let blinkyGhost = document.getElementById("blinky");
let pinkyGhost = document.getElementById("pinky");
let clydeGhost = document.getElementById("clyde");
let vulnerableGhost = document.getElementById("vulnerable")
let scoreValue = 0;
let pelletsValue = 0;
let powerUp = false;
let gameRunning = false;
let mouseX = 0
let mouseY = 0
let color1 = "green";
let ui = true;
let gamewin = false;
let timer = 0;
let timerMax = 1500;
let gameLost = false;
let highscoreValue = 0;
let ghostArray = [
  {
    ghostName:"inky",
    ghostX: 6,
    ghostY: 5,
    ghostImage: inkyGhost,
    ghostAlive: true
  },
  {
    ghostName:"blinky",
    ghostX: 10,
    ghostY: 12,
    ghostImage: blinkyGhost,
    ghostAlive: true
  },
  {
    ghostName:"pinky",
    ghostX: 11,
    ghostY: 14,
    ghostImage: pinkyGhost,
    ghostAlive: true
  },
  {
    ghostName:"clyde",
    ghostX: 4,
    ghostY: 8,
    ghostImage: clydeGhost,
    ghostAlive: true
  },
];

let wallPositions = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let pelletPositions = wallPositions.map(row=>row.map(item=>{
  if (item === 0) {
    pelletsValue++
    return item+1

  }
  else {
    return item-1
  }
}))

for (let index = 7;index<=11;index++) {
    for (let yIndex = 8; yIndex<=9; yIndex++) {
      pelletPositions[yIndex][index] = 0
    }
}

let defaultPellets = structuredClone(pelletPositions)


for (let index = 0 ;index<=10 ;index++ ) {
  let randomX = Math.floor(Math.random() * 19)
  let randomY = Math.floor(Math.random() * 19)
  if(pelletPositions[randomX][randomY] == 1) {
    pelletPositions[randomX][randomY] = 2 
  } else {
    index--; 
  }
}

console.log(pelletPositions)



let maze = document.getElementById("maze");
let canvasWidth = boardCanvas.width;
let canvasHeight = boardCanvas.height;
let characterX = 9;
let characterY = 9;
let characterDirection = "up";

function doubleLine(startX, startY, endX, endY) {
  if (startY === endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY - 5);
    ctx.lineTo(endX, endY - 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(startX, startY + 5);
    ctx.lineTo(endX, endY + 5);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(startX - 5, startY);
    ctx.lineTo(endX - 5, endY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(startX + 5, startY);
    ctx.lineTo(endX + 5, endY);
    ctx.stroke();
  }
}

let gamePadding = 20;
let squareCount = 19;
let squareSize = (canvasWidth - 2 * gamePadding) / squareCount;


function getGhostByName (name) { 
  return ghostArray.findIndex((obj) => {
    if(obj.ghostName === name){
      return true
    } else {
      return false
    }
  })
}
function drawBoard() {
  // draw board
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  // ctx.drawImage(maze, 0, 0, canvasWidth, canvasHeight)

  // maze edges
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;

  gameWall(0, 0, 9, 0); // top left
  gameWall(10, 0, 19, 0); // top right

  gameWall(0, 19, 19, 19); // bottom

  gameWall(0, 0, 0, 6); // left top

  gameWall(4, 6, 4, 12); // left inner right
  gameWall(0, 6, 4, 6); // left inner top
  gameWall(0, 12, 4, 12); // left inner bottom

  gameWall(0, 12, 0, 15); // left bottom
  gameWall(0, 15, 2, 15); // left bottom inner top
  gameWall(2, 15, 2, 16); // left bottom inner right
  gameWall(2, 16, 0, 16); // left bottom inner bottom
  gameWall(0, 16, 0, 19); // left bottom bottom

  gameWall(19, 0, 19, 6); // right top
  gameWall(15, 6, 15, 12); // right inner left
  gameWall(15, 6, 19, 6); // right inner top
  gameWall(15, 12, 19, 12); // right inner bottom

  gameWall(19, 12, 19, 15); // right bottom
  gameWall(19, 15, 17, 15); // right bottom inner top
  gameWall(17, 15, 17, 16); // right bottom inner left
  gameWall(17, 16, 19, 16); // right bottom inner bottom
  gameWall(19, 16, 19, 19); // right bottom bottom

  // draw center box
  gameWall(7, 8, 9, 8); // bottom
  gameWall(10, 8, 12, 8); // bottom
  gameWall(7, 10, 12, 10); // bottom
  gameWall(12, 8, 12, 10); // right
  gameWall(7, 8, 7, 10); // left

  //top left box
  gameWall(1, 1, 1, 3); //left
  gameWall(4, 1, 4, 3); //right
  gameWall(1, 1, 4, 1); //top
  gameWall(1, 3, 4, 3); //bottom

  // mid top left box
  gameWall(5, 1, 5, 3); //left
  gameWall(8, 1, 8, 3); //right
  gameWall(5, 1, 8, 1); //top
  gameWall(5, 3, 8, 3); //bottom

  //mid top left box
  gameWall(1, 4, 1, 5); //left
  gameWall(4, 4, 4, 5); //right
  gameWall(1, 4, 4, 4); //top
  gameWall(1, 5, 4, 5); //bottom

  // all 3 boxes, but flippe dot other side of top

  // top right box
  gameWall(15, 1, 15, 3); //left
  gameWall(18, 1, 18, 3); //right
  gameWall(15, 1, 18, 1); //top
  gameWall(15, 3, 18, 3); //bottom

  // mid top right box
  gameWall(15, 4, 15, 5); //left
  gameWall(18, 4, 18, 5); //right
  gameWall(15, 4, 18, 4); //top
  gameWall(15, 5, 18, 5); //bottom

  // bottom left box
  gameWall(11, 1, 11, 3); //left
  gameWall(14, 1, 14, 3); //right
  gameWall(11, 1, 14, 1); //top
  gameWall(11, 3, 14, 3); //bottom

  //mid top line
  gameWall(9, 0, 9, 3); //left
  gameWall(10, 0, 10, 3); //right
  gameWall(9, 3, 10, 3); //bottom

  // mid top T
  gameWall(7, 4, 7, 5); //left
  gameWall(12, 4, 12, 5); //right
  gameWall(7, 4, 12, 4); //top
  gameWall(7, 5, 9, 5); //bottom
  gameWall(10, 5, 12, 5); //bottom
  gameWall(9, 5, 9, 7); //left bottom
  gameWall(10, 5, 10, 7); //right bottom
  gameWall(9, 7, 10, 7); //bottom bottom

  // top left T
  gameWall(5, 4, 5, 9); //left
  gameWall(6, 6, 6, 4); //right
  gameWall(6, 7, 6, 9); //right
  gameWall(5, 4, 6, 4); //top
  gameWall(5, 9, 6, 9); //bottom
  gameWall(6, 6, 8, 6); //right top
  gameWall(6, 7, 8, 7); //right bottom
  gameWall(8, 6, 8, 7); //right right

  // top right T
  gameWall(13, 4, 13, 6); //left
  gameWall(13, 7, 13, 9); //left
  gameWall(14, 4, 14, 9); //right
  gameWall(13, 4, 14, 4); //top
  gameWall(13, 9, 14, 9); //bottom
  gameWall(11, 6, 13, 6); //right top
  gameWall(11, 7, 13, 7); //right bottom
  gameWall(11, 6, 11, 7); //right left

  //middle left box
  gameWall(5, 10, 5, 12); //left
  gameWall(6, 10, 6, 12); //right
  gameWall(5, 10, 6, 10); //top
  gameWall(5, 12, 6, 12); //bottom

  //middle right box
  gameWall(13, 10, 13, 12); //left
  gameWall(14, 10, 14, 12); //right
  gameWall(13, 10, 14, 10); //top
  gameWall(13, 12, 14, 12); //bottom

  // mid bottom T
  gameWall(7, 11, 12, 11); //top
  gameWall(7, 11, 7, 12); //left
  gameWall(12, 11, 12, 12); //right
  gameWall(7, 12, 9, 12); //bottom
  gameWall(10, 12, 12, 12); //bottom
  gameWall(9, 12, 9, 14); //bottom left
  gameWall(10, 12, 10, 14); //bottom right
  gameWall(9, 14, 10, 14); //bottom bottom

  // bottom bottom T
  gameWall(7, 15, 12, 15); //top
  gameWall(7, 15, 7, 16); //left
  gameWall(12, 15, 12, 16); //right
  gameWall(7, 16, 9, 16); //bottom
  gameWall(10, 16, 12, 16); //bottom
  gameWall(9, 16, 9, 18); //bottom left
  gameWall(10, 16, 10, 18); //bottom right
  gameWall(9, 18, 10, 18); //bottom bottom

  // mid bottom left box
  gameWall(5, 13, 8, 13); //top
  gameWall(5, 13, 5, 14); //left
  gameWall(8, 13, 8, 14); //right
  gameWall(5, 14, 8, 14); //bottom

  // mid bottom right box
  gameWall(11, 13, 14, 13); //top
  gameWall(11, 13, 11, 14); //left
  gameWall(14, 13, 14, 14); //right
  gameWall(11, 14, 14, 14); //bottom

  // bottom left upside down T
  gameWall(1, 17, 5, 17); //top
  gameWall(6, 17, 8, 17); //top
  gameWall(1, 17, 1, 18); //left
  gameWall(8, 17, 8, 18); //right
  gameWall(1, 18, 8, 18); //bottom
  gameWall(5, 15, 5, 17); //top left
  gameWall(6, 15, 6, 17); //top right
  gameWall(5, 15, 6, 15); //top top

  // bottom right upside down T
  gameWall(11, 17, 13, 17); //top
  gameWall(14, 17, 18, 17); //top
  gameWall(11, 17, 11, 18); //left
  gameWall(18, 17, 18, 18); //right
  gameWall(11, 18, 18, 18); //bottom
  gameWall(13, 15, 13, 17); //top left
  gameWall(14, 15, 14, 17); //top right
  gameWall(13, 15, 14, 15); //top top

  // bottom mid left upside down L
  gameWall(1, 13, 4, 13); //top
  gameWall(1, 13, 1, 14); //left
  gameWall(4, 13, 4, 16); //right
  gameWall(1, 14, 3, 14); //bottom
  gameWall(3, 16, 4, 16); //bottom bottom
  gameWall(3, 14, 3, 16); //bottom left

  // bottom mid right upside down L
  gameWall(15, 13, 18, 13); //top
  gameWall(15, 13, 15, 16); //left
  gameWall(18, 13, 18, 14); //right
  gameWall(16, 14, 18, 14); //bottom
  gameWall(15, 16, 16, 16); //bottom bottom
  gameWall(16, 14, 16, 16); //bottom right
}


function drawPellets() {
    pelletPositions.forEach((row,rowIndex)=>row.forEach((item,index)=>{
    if (item === 1) {
      ctx.fillStyle = "white";
      ctx.fillRect(index * squareSize + gamePadding + squareSize/2 - 7/2, rowIndex*squareSize + gamePadding + squareSize/2 - 7/2, 7,7)
    }
    if (item === 2) {
      ctx.fillStyle = "yellow"
      ctx.fillRect(index * squareSize + gamePadding + squareSize/2 - 12/2, rowIndex*squareSize + gamePadding + squareSize/2 - 12/2, 12,12)
    }
  }))
}
function drawPlayer() {
  ctx.save();
  ctx.translate(
    gamePadding + characterX * squareSize + squareSize / 2,
    gamePadding + characterY * squareSize + squareSize / 2
  );
  if (characterDirection === "up") {
    ctx.rotate(Math.PI / 2);
  }
  if (characterDirection === "down") {
    ctx.rotate((Math.PI * 3) / 2);
  }
  if (characterDirection === "left") {
    ctx.rotate(0);
  }
  if (characterDirection === "right") {
    ctx.rotate(Math.PI);
  }
  ctx.drawImage(
    character,
    -squareSize / 2,
    -squareSize / 2,
    squareSize,
    squareSize
  );
  ctx.restore();
}

function drawGhost(ghostIndex) {
 if (powerUp === true) {
  ctx.drawImage(vulnerableGhost,
    ghostArray[ghostIndex].ghostX * squareSize + gamePadding,
    ghostArray[ghostIndex].ghostY * squareSize + gamePadding,
    squareSize,
    squareSize
  );
 }
  else {ctx.drawImage(
    ghostArray[ghostIndex].ghostImage,
    ghostArray[ghostIndex].ghostX * squareSize + gamePadding,
    ghostArray[ghostIndex].ghostY * squareSize + gamePadding,
    squareSize,
    squareSize
  );
}
}

function drawUI () {
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.font = "bold 50px monospace";
  ctx.fillText("SCORE: " +scoreValue, 0 * squareSize + gamePadding, 7 * squareSize + gamePadding)
  ctx.fillText("BEST: " +highscoreValue, 0 * squareSize + gamePadding, 8 * squareSize + gamePadding)

  if (ui === true) {
 ctx.fillStyle = "rgba(100,100,100,0.75)";
  ctx.fillRect(canvasWidth / 4, canvasHeight / 4 , canvasWidth / 2, canvasHeight / 2)
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "bold 50px monospace";
  ctx.fillText("PAC-MAN", canvasWidth/2, canvasHeight /3)
  if (gameLost === true) {
    ctx.fillText ("YOU LOST", canvasWidth/2, canvasHeight /3 + canvasHeight/18)
    ctx.fillText("SCORE:" +previousScore, canvasWidth/2, canvasHeight/3 + canvasHeight/8)
    ctx.fillText("HIGHSCORE:" +highscoreValue, canvasHeight/2, canvasHeight/3 + canvasHeight/6)
  }
  if (gamewin === true) {
    ctx.fillText ("YOU WON", canvasWidth/2, canvasHeight /3 + canvasHeight/18)
    ctx.fillText("SCORE:" +previousScore, canvasWidth/2, canvasHeight/3 + canvasHeight/8)
    ctx.fillText("HIGHSCORE:" +highscoreValue, canvasHeight/2, canvasHeight/3 + canvasHeight/6)
  }

  // replace with checking code
  
  ctx.fillStyle = color1;
  ctx.fillRect(canvasWidth/4 + 30, canvasHeight/2 + 225, canvasWidth /2 - 60, canvasHeight/4 - 225- 30)

  ctx.fillStyle = "white";
  ctx.textBaseline = "middle";
  if (gameLost === true) {
    ctx.fillText("PLAY AGAIN", canvasWidth/4 + 30 + (canvasWidth/2 - 60)/2, canvasHeight/2 + 225 + (canvasHeight/4 - 225 - 30)/2 )
  } else {
  ctx.fillText("PLAY", canvasWidth/4 + 30 + (canvasWidth/2 - 60)/2, canvasHeight/2 + 225 + (canvasHeight/4 - 225 - 30)/2 ) }
  }


  
}

function gameWall(startX, startY, endX, endY) {
  doubleLine(
    gamePadding + startX * squareSize,
    gamePadding + startY * squareSize,
    gamePadding + endX * squareSize,
    gamePadding + endY * squareSize
  );
}

//event listener & player movement
window.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") {
    characterDirection = "up";
  }
  if (e.key === "a" || e.key === "ArrowLeft") {
    characterDirection = "left";
  }
  if (e.key === "s" || e.key === "ArrowDown") {
    characterDirection = "down";
  }
  if (e.key === "d" || e.key === "ArrowRight") {
    characterDirection = "right";
  }
});

boardCanvas.addEventListener("mousemove", (e) => {
  let canvasPosition = boardCanvas.getBoundingClientRect()
  mouseX = e.clientX - canvasPosition.left
  mouseY = e.clientY - canvasPosition.top
  // console.log (mouseX, mouseY)
  if (mouseX > 213 && mouseX < 577 && mouseY < 577 && mouseY > 515) {
      console.log("overbutton")
      color1 = "rgb(50,205,50)";
      window.addEventListener("mousedown", (e) => {
        gameRunning = true
        ui = false;
      })
  } else {
    color1 = "green";
  }


});


function isBlockedByGate(fromX, fromY, toX, toY) {
  const dx = toX - fromX, dy = toY - fromY;
  // moving right
  if (dx === 1 && ((fromX === 11 && fromY > 7 && fromY < 10) ||
                   (fromX === 6  && fromY > 7 && fromY < 10))) {
    return true;
  }
  // moving left
  if (dx === -1 && (
    (fromX === 11 && fromY > 7 && fromY < 10) ||
    (fromX === 12 && fromY > 7 && fromY < 10)  // ← was 8 before, should be 12
  )) {
 return true;
}
  // moving down
  if (dy === 1 && ((fromY === 9 && fromX > 6 && fromX < 12) ||
                   (fromY === 7 && ((fromX > 6 && fromX < 9) || (fromX > 9 && fromX < 12))))) {
    return true;
  }
  // moving up
  if (dy === -1 && ((fromY === 8 && ((fromX > 6 && fromX < 9) || (fromX > 9 && fromX < 12))) ||
                    (fromY === 10 && fromX > 6 && fromX < 12))) {
    return true;
  }
  return false;
}

function findNextMove(sx, sy, tx, ty) {
  const rows = wallPositions.length;
  const cols = wallPositions[0].length;
  const visited = Array.from({length: rows}, () => Array(cols).fill(false));
  const parent  = {};            // map "x,y" → [px,py]
  const queue   = [[sx, sy]];
  visited[sy][sx] = true;
  const dirs    = [[1,0],[-1,0],[0,1],[0,-1]];

  while (queue.length) {
    const [x,y] = queue.shift();
    if (x === tx && y === ty) {
      let cx = x, cy = y, path = [];
      while (!(cx === sx && cy === sy)) {
        path.push([cx, cy]);
        [cx, cy] = parent[`${cx},${cy}`];
      }
      path.reverse();          // now path[0] is your next cell
      const [nx, ny] = path[0] || [sx, sy];
      return [nx - sx, ny - sy];
     }

    for (let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x+dx, ny = y+dy;
      if (
        nx<0||ny<0||nx>=cols||ny>=rows ||
        visited[ny][nx] ||
        wallPositions[ny][nx] !== 0 ||
        isBlockedByGate(x,y,nx,ny)
      ) continue;

      visited[ny][nx] = true;
      parent[`${nx},${ny}`] = [x,y];
      queue.push([nx,ny]);
    }
  }
  return [0,0];
}

function findAwayMove(sx, sy, tx, ty, occupiedSpots) {
  const rows = wallPositions.length;
  const cols = wallPositions[0].length;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let bestDist = Math.abs(sx - tx) + Math.abs(sy - ty);
  let bestMove = [0,0];
  for (let [dx,dy] of dirs) {
    const nx = sx + dx, ny = sy + dy;
    if (
      nx >= 0 && ny >= 0 && nx < cols && ny < rows &&
      wallPositions[ny][nx] === 0 &&
      !isBlockedByGate(sx, sy, nx, ny) &&
      !occupiedSpots.has(`${nx}, ${ny}`)
    ) {
      const dist = Math.abs(nx - tx) + Math.abs(ny - ty);
      if (dist > bestDist) {
        bestDist = dist;
        bestMove = [dx, dy];
      }
    }
  }
  return bestMove;
}

function moveGhosts() {
  let occupiedSpots = new Set();

  for (let ghost of ghostArray) {
    occupiedSpots.add(`${ghost.ghostX}, ${ghost.ghostY}`)
  }
  for (let ghostIndex = 0; ghostIndex < ghostArray.length; ghostIndex++) {
    let ghostX = ghostArray[ghostIndex].ghostX;
    let ghostY = ghostArray[ghostIndex].ghostY;
    
    const [dx, dy] = powerUp
  ? findAwayMove(ghostX, ghostY, characterX, characterY, occupiedSpots)
  : findNextMove(ghostX, ghostY, characterX, characterY);

    const newX = ghostArray[ghostIndex].ghostX + dx;
    const newY = ghostArray[ghostIndex].ghostY + dy;

    // Check if the new spot is not occupied, then take if true
    if (!occupiedSpots.has(`${newX}, ${newY}`)) {
         occupiedSpots.delete(`${ghostArray[ghostIndex].ghostX}, ${ghostArray[ghostIndex].ghostY}`)
         ghostArray[ghostIndex].ghostX = newX
         ghostArray[ghostIndex].ghostY = newY
         occupiedSpots.add(`${ghostArray[ghostIndex].ghostX}, ${ghostArray[ghostIndex].ghostY}`)
    }
    // Nothing happens if occupied
  }
}

function drawCheckCollisions () {
  drawBoard();
  drawPellets();
  drawGhost(0);
  drawGhost(1);
  drawGhost(2);
  drawGhost(3);
  drawPlayer();
  drawUI();
  checkGhostCollision();
  checkPelletCollision();

}


let skip = true

setInterval(() => {
  if (skip === true) {
    skip = false
  } else {
    skip = true
  } 

if (!powerUp || skip) {
  if (gameRunning) {  
    moveGhosts();
    drawCheckCollisions();
  } 
}
}, 500) 

setInterval(() => {
  console.log("hi");
  if (timer>0) {
    timer = timer-100 
  } else {
    powerUp = false;
  }
  
if (gameRunning) {
  movePlayer();
} 
  drawCheckCollisions();
}, 500); 

function movePlayer () {
  if (characterDirection === "right") {
    if (characterX < 18 && wallPositions[characterY][characterX + 1] === 0) {
      if (
        (characterX === 11 && characterY > 7 && characterY < 10) ||
        (characterX === 6 && characterY > 7 && characterY < 10)
      ) {
      } else {
        characterX = characterX + 1;
      }
    } 
  }
  if (characterDirection === "left") {
    if (characterX > 0 && wallPositions[characterY][characterX - 1] === 0) {
      if (
        (characterX === 11 && characterY > 7 && characterY < 10) ||
        (characterX === 12 && characterY > 7 && characterY < 10)
      ) {
      } else {
        characterX = characterX - 1;
      }
    }
  }
  if (characterDirection === "up") {
    if (characterY > 0 && wallPositions[characterY - 1][characterX] === 0) {
      if (
        (characterY === 8 &&
          ((characterX > 6 && characterX < 9) ||
            (characterX > 9 && characterX < 12))) ||
        (characterY === 10 && characterX > 6 && characterX < 12)
      ) {
      } else {
        characterY = characterY - 1;
      }
    }
  }
  if (characterDirection === "down") {
    if (
      (characterY === 9 && characterX > 6 && characterX < 12) ||
      (characterY === 7 &&
        ((characterX > 6 && characterX < 9) ||
          (characterX > 9 && characterX < 12)))
    ) {
    } else {
      if (characterY < 18 && wallPositions[characterY + 1][characterX] === 0) {
        characterY = characterY + 1;
      }
    }
  }
}

function checkGhostCollision() {
  for (let ghost of ghostArray) {
    if (characterX === ghost.ghostX && characterY === ghost.ghostY) {
      if (powerUp) {
        console.log("ghostHit")
        scoreValue = scoreValue+10
        let ghostIndexNumber = getGhostByName(ghost.ghostName)
        console.log(ghostIndexNumber)
        ghostArray[ghostIndexNumber].ghostX = 9
        ghostArray[ghostIndexNumber].ghostY = 9 
        if (scoreValue>highscoreValue) {
          highscoreValue = scoreValue
        }
      
      }
      else {
      // window.alert("You lost, game over. Resetting character.")
      console.log("You Lost")
      gameLost = true
      resetGame()
      }
    }
  }
}



function win () {
  if (pelletsValue === 0) {
    gamewin = true
    ui = true
    resetGame();
  }
}
function checkPelletCollision() {
  for (let y = 0; y<pelletPositions.length;y++) {
    for (let x = 0;x<pelletPositions[y].length; x++) {
      if (characterX === x && characterY === y) {
        if (pelletPositions[characterY][characterX] === 1) {
          scoreValue = scoreValue+1
          pelletsValue = pelletsValue-1
          console.log(pelletsValue)
          if (scoreValue > highscoreValue) {
            highscoreValue = scoreValue
          }
       }
       if (pelletPositions[characterY][characterX] === 2) {
        scoreValue = scoreValue+10
        powerUp = true
        timer = timerMax
        if (scoreValue>highscoreValue) {
        highscoreValue = scoreValue }

        
     }
        pelletPositions[characterY][characterX] = 0
      }
    }
  }
}
 

function resetGame() {
  previousScore = scoreValue
  characterX = 9
  characterY = 9
  powerUp = false;
  gameRunning = false
  ui = true
  characterDirection = "up";
  pelletPositions = structuredClone(defaultPellets)
  for (let index = 0 ;index<=10 ;index++ ) {
    let randomX = Math.floor(Math.random() * 19)
    let randomY = Math.floor(Math.random() * 19)
    if(pelletPositions[randomX][randomY] == 1) {
      pelletPositions[randomX][randomY] = 2 
    } else {
      index--; 
    }
  }
  if (scoreValue > highscoreValue) {
    highscoreValue = scoreValue 
  }
  scoreValue = 0
  ghostArray = [{
    ghostX: 6,
    ghostY: 5,
    ghostImage: inkyGhost,
  },
  {
    ghostX: 10,
    ghostY: 12,
    ghostImage: blinkyGhost,
  },
  {
    ghostX: 11,
    ghostY: 14,
    ghostImage: pinkyGhost,
  },
  {
    ghostX: 4,
    ghostY: 8,
    ghostImage: clydeGhost,
  },
];
}

drawBoard();
drawPellets();
drawGhost(0);
drawGhost(1);
drawGhost(2);
drawGhost(3);
drawPlayer();
drawUI();                                                       
