

const turnbox = document.getElementById('turnbox');
const canvas = document.getElementById('checkersBoard');
const ctx = canvas.getContext('2d');
let turn = "r"
let selectedpiece = null
const tileSize = 60;
const boardSize = 8
const squareSize = 500/boardSize
const rows = 8
const columns = 8
let board = []

function createBoard () {
  for (let row = 0;row<rows;row++){
    board[row] = []
    for (let column = 0;column<columns;column++) {
      if ((row + column) % 2 === 1) {
        if (row<3) {
          board[row][column] = "r"
        }
        else if (row>4) {
          board[row][column] = "w"
        }
        else board[row][column] = ""
      }
    }
  }
}




  function drawTile(row, column){
    if ((row + column) % 2 === 0) {
        ctx.fillStyle = "white"
    } else 
      ctx.fillStyle = "black"
    ctx.fillRect(column * squareSize, row * squareSize, squareSize, squareSize)
  }



  function drawPiece(col, row, player) {
    // console.log (col, row, player)
    ctx.beginPath();
    ctx.arc(col * squareSize + squareSize / 2, row * squareSize + squareSize / 2, squareSize/2.5, 0, Math.PI * 2);
    ctx.fillStyle = player === "r" ? "red": "white"
    ctx.fill();
    ctx.closePath();
 
    // ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize)
     
} 

  //function to move pieces
function movePiece (event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left)/squareSize);
  const y = Math.floor((event.clientY - rect.top)/squareSize);
  console.log (x, y)

  if (selectedpiece) {
    if (turn === "r") {
      if (checkMove(selectedpiece[0], selectedpiece[1], x, y)) {
        console.log("eeeeeeeee")
        board[selectedpiece[1]][selectedpiece[0]] = ""
        selectedpiece = null
        board[y][x] = turn
        switchTurn()
        drawBoard()
        drawPieces()
        console.log(x)
        console.log(y)
      }
      else {
        window.alert("Invalid move; Please make a valid move")
      }
    }
    else {
      if (checkMove(selectedpiece[0], selectedpiece[1], x, y)) {
        console.log("eeeeeeeee")
        board[selectedpiece[1]][selectedpiece[0]] = ""
        selectedpiece = null
        board[y][x] = turn
        switchTurn()
        drawBoard()
        drawPieces()
        console.log(x)
        console.log(y)
      }
      else {
        window.alert("Invalid move; Please make a valid move")
      }

    }
  } 
  else if (board[y][x] === turn) {
    selectedpiece = [x,y]
    console.log("e")
    console.log(x)
    console.log(y)
    console.log(selectedpiece)  
  }
  console.log(board)
}
//function to check if move is valid
function checkMove (startX, startY, endX, endY) {

let sign = 0<(endY - startY);
if (turn === "w") {
  if(sign){
    return false
  }
}
else if(!sign) {
  return false
}
const rowdiff = Math.abs(endY - startY)
const columndiff = Math.abs(endX - startX)
if (rowdiff === 1 && columndiff === 1) {
  return true
}
 if (rowdiff === 2 && columndiff === 2) {
  checkJumpValid(startX, startY, endX, endY)

}
if (board[endY][endX] !== "" ) {
  return false

}
return false 

}



function checkJumpValid (startX, startY, jumpX, jumpY, endX, endY) {
  if (turn === "r"){
      console.log ("red")
         if (board[jumpX][jumpY] === "w") {
            if (board[destX][destY] === "") {
              console.log("checkJumpValid === true")
              return true 
            }
   
    }
  }
  else {
    console.log("white")
      if (board[jumpX][jumpY] === "r") {
            if (board[destX][destY] === "") {
              console.log("checkJumpValid === true")
              return true 
    
        }
     }
  }

}
function switchTurn () {
  if (turn === "r") {
    turn = "w"
  }
  else turn = "r"
}

// Function to draw the checkered board
function drawBoard() { 
  if (turn === "r") {
     turnbox.textContent = "Red"
  } 
    else {
     turnbox.textContent = "White"
    }
   
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      // Alternate colors for the board squares
      if ((row + col) % 2 === 0) {
        ctx.fillStyle = 'white';
      } else {
        ctx.fillStyle = 'black';
      }
      ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
    }
  }
}

// Function to draw pieces on the board
function drawPieces() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      // Draw red pieces on the top 3 rows (on black squares)
      if (board[row][col]== "r") {
        drawPiece(col, row, 'r');
      }
      // Draw black pieces on the bottom 3 rows (on black squares)
      if (board [row][col]== "w") {
        drawPiece(col, row, 'w');
      }
    }
  }
}

// Function to draw an individual piece 


// Initial function call to draw the board and pieces
createBoard();
drawBoard();
drawPieces();


canvas.addEventListener("click", movePiece)


