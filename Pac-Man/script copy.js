let boardCanvas = document.getElementById("boardCanvas");
let ctx = boardCanvas.getContext("2d");
let character = document.getElementById("character");
let inkyGhost = document.getElementById("inky");
let blinkyGhost = document.getElementById("blinky");
let pinkyGhost = document.getElementById("pinky");
let clydeGhost = document.getElementById("clyde");
let ghostArray = [
  {
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

let wallPositions = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

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
  ctx.drawImage(
    ghostArray[ghostIndex].ghostImage,
    ghostArray[ghostIndex].ghostX * squareSize + gamePadding,
    ghostArray[ghostIndex].ghostY * squareSize + gamePadding,
    squareSize,
    squareSize
  );
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

function moveGhosts() {
  for (let ghostIndex = 0; ghostIndex < ghostArray.length; ghostIndex++) {
    let ghostX = ghostArray[ghostIndex].ghostX;
    let ghostY = ghostArray[ghostIndex].ghostY;

    let distanceX = characterX - ghostX;
    let distanceY = characterY - ghostY;

    function checkGhostMove(moveX, moveY) {
      if (moveX > 0) {
        if (ghostX < 19-moveX && wallPositions[ghostY][ghostX + moveX] === 0) {
          if (
            (ghostX === 12-moveX && ghostY > 7 && ghostY < 10) ||
            (ghostX === 7-moveX && ghostY > 7 && ghostY < 10)
          ) {
          } else {
            return true;
          }
        }
      }
      if (moveX < 0) {
        if (ghostX > -1-moveX && wallPositions[ghostY][ghostX + moveX] === 0) {
          if (
            (ghostX === 10-moveX && ghostY > 7 && ghostY < 10) ||
            (ghostX === 11-moveX && ghostY > 7 && ghostY < 10)
          ) {
          } else {
            return true;
          }
        }
      }

      if (moveY > 0) {
        if (
          (ghostY === 10-moveY && ghostX > 6 && ghostX < 12) ||
          (ghostY === 8-moveY &&
            ((ghostX > 6 && ghostX < 9) || (ghostX > 9 && ghostX < 12)))
        ) {
        } else {
          if (ghostY < 19-moveY && wallPositions[ghostY + moveY][ghostX] === 0) {
            return true;
          }
        }
      }
      if (moveY < 0) {
        if (ghostY > -1-moveY && wallPositions[ghostY + moveY][ghostX] === 0) {
          if (
            (ghostY === 7-moveY &&
              ((ghostX > 6 && ghostX < 9) || (ghostX > 9 && ghostX < 12))) ||
            (ghostY === 9-moveY && ghostX > 6 && ghostX < 12)
          ) {
          } else {
            return true;
          }
        }
      }

      return false;
    }

    function checkRay(moveX, moveY) {
      //check all 3 spaces in direction trying to move instead of just one (for walls)\

      console.log(ghostX, ghostY)
      if(checkGhostMove(moveX, moveY) === false) {
        console.log("checkRay",ghostX, ghostY)
        return false 
      }
      if (checkGhostMove(2 *(moveX), 2*(moveY)) === false) {
        console.log("checkRay2",ghostX, ghostY)
        return false
      }
      if (checkGhostMove(3*(moveX), 3*(moveY)) === false) {
        return false 
      }

      return true

    }

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX > 0) {
        if (checkGhostMove(1, 0) === true) {
          ghostArray[ghostIndex].ghostX = ghostX + 1;
        } else {
          if (checkGhostMove(0, 1) && checkRay(0,1)) {
            console.log("down",checkRay(0,1))
            ghostArray[ghostIndex].ghostY = ghostY + 1;
          } else {
            if (checkGhostMove(0, -1)) {
              ghostArray[ghostIndex].ghostY = ghostY - 1;
            }
          }
        }
      } else {
        if (checkGhostMove(-1, 0)) {
          ghostArray[ghostIndex].ghostX = ghostX - 1;
        }
      }
    } else {
      if (distanceY > 0) {
        if (checkGhostMove(0, 1)) {
          ghostArray[ghostIndex].ghostY = ghostY + 1;
        }
      } else {
        if (checkGhostMove(0, -1)) {
          ghostArray[ghostIndex].ghostY = ghostY - 1;
        }
      }
    }
  }
}

setInterval(() => {
  console.log("hi");

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

  moveGhosts();
  drawBoard();
  drawGhost(0);
  drawGhost(1);
  drawGhost(2);
  drawGhost(3);
  drawPlayer();
}, 500);

drawBoard();
drawGhost(0);
drawGhost(1);
drawGhost(2);
drawGhost(3);
drawPlayer();
