
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
