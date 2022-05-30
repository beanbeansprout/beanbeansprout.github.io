document.addEventListener('keydown', keyDown);

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false); // stackoverflow

class Piece {
  constructor(color, x, y, w, h, num) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.num = num;
    this.color = color;
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    
    ctx.lineWidth = "6";
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    
    ctx.fillStyle = "white";
    ctx.font = tileSize / 5 + "px Helvetica";
    ctx.fillText(this.num, this.x + this.w / 2, this.y + this.h / 2);
  }
}

class Blank {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    
    ctx.lineWidth = "6";
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}

var maxPieces, maxRows, maxCols, colCount;

const tileSize = 100;

var pieces = [];
var pieceWinPosX = [];
var pieceWinPosY = [];
var checkPiecePos = [];
var colors = ["darkgreen", "limegreen"];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var title = document.getElementById("title");
var winStatus = document.getElementById("win");

initBoardVals(15, 4, 4);
load();
setInterval(update, 10);

const scrambleAmount = maxPieces * 100000;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPieces();
  blank.draw();
  checkWin();
}

function resizeCanvas() {
  canvas.width = maxRows * tileSize;
  canvas.height = maxCols * tileSize;
}

function load() {
  resizeCanvas();
  initPieces();
  initBlank();
  title.innerHTML = maxPieces + " Puzzle";
  header.innerHTML = maxPieces + " Puzzle";
}

function initBoardVals(maxpieces, maxrows, maxcols) {
  checkPiecePos = [];
  pieces = [];
  blank = null;
  maxPieces = maxpieces;
  maxRows = maxrows;
  maxCols = maxcols;
  colCount = 0;
}

function initPieces() {
  for (let i = 0; i < maxPieces; i++) {
    pieces[i] = new Piece(colors[(i + colCount) % 2], i % maxRows * tileSize, i % maxCols == maxCols - 1 ? colCount++ * tileSize : colCount * tileSize, tileSize, tileSize, i + 1);
    
    pieceWinPosX[i] = pieces[i].x;
    pieceWinPosY[i] = pieces[i].y;
  }
}

function initBlank() {
  blank = new Blank(pieces[pieces.length - 1].x + tileSize, pieces[pieces.length - 1].y, tileSize, tileSize);
}

function drawPieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].draw();
  }
}

function keyDown(e) {
  for (let i = 0; i < maxPieces; i++) {
    if (e.code == "ArrowUp") {
      if (pieceDown(i)) { break }
    }
      
    else if (e.code == "ArrowDown") {
      if (pieceUp(i)) { break }
    }
    
    else if (e.code == "ArrowRight") {
      if (pieceLeft(i)) { break }
    }
    
    else if (e.code == "ArrowLeft") {
      if (pieceRight(i)) { break }
    }
  }
}

function pieceDown(i) {
  if (blank.x == pieces[i].x && blank.y + tileSize == pieces[i].y) {
    blank.y += tileSize;
    pieces[i].y -= tileSize;
    return true;
  } else {
    return false;
  }
}

function pieceUp(i) {
  if (blank.x == pieces[i].x && blank.y - tileSize == pieces[i].y) {
    blank.y -= tileSize;
    pieces[i].y += tileSize;
    return true;
  } else {
    return false; 
  }
}

function pieceLeft(i) {
  if (blank.y == pieces[i].y && blank.x - tileSize == pieces[i].x) {
    blank.x -= tileSize;
    pieces[i].x += tileSize;
    return true;
  } else {
    return false; 
  }
}

function pieceRight(i) {
  if (blank.y == pieces[i].y && blank.x + tileSize == pieces[i].x) {
    blank.x += tileSize;
    pieces[i].x -= tileSize;
    return true;
  } else {
    return false; 
  }
}

/* Anything below this line is not needed for the base game. The movement of pieces could be simplified for the base game, but are not to make the code less redundant. */

function scramble() {
  let rand = 0;
  for (let i = 0; i < scrambleAmount; i++) {
    rand = Math.floor(Math.random() * 4);
    
    if (rand == 0) {
      for (let j = 0; j < pieces.length; j++) {
        if (pieceDown(j)) { break }
      }
    }
    
    else if (rand == 1) {
      for (let j = 0; j < pieces.length; j++) {
        if (pieceUp(j)) { break }
      }
    }
    
    else if (rand == 2) {
      for (let j = 0; j < pieces.length; j++) {
        if (pieceLeft(j)) { break }
      }
    } else {
      for (let j = 0; j < pieces.length; j++) {
        if (pieceRight(j)) { break }
      }
    }
  }
}

function resizeBoard(element) {
  if (element.id == "3") {
    initBoardVals(3, 2, 2);
    load();
  }
  
  else if (element.id == "15") {
    initBoardVals(15, 4, 4);
    load();
  }
  
  else if (element.id == "63") {
    initBoardVals(63, 8, 8);
    load();
  }
  
  else if (element.id == "255") {
    initBoardVals(255, 16, 16);
    load();
  }
  
  else if (element.id == "1023") {
    initBoardVals(1023, 32, 32);
    load();
  } else {
    initBoardVals(4095, 64, 64);
    load();
  }
}

function checkWin() {
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].x == pieceWinPosX[i] && pieces[i].y == pieceWinPosY[i]) {
      checkPiecePos[i] = true;
    } else {
      checkPiecePos[i] = false; 
    }
  }
  
  for (let i = 0; i < checkPiecePos.length; i++) {
    if (!checkPiecePos[i]) {
      winStatus.innerHTML = "​";
      break;
    }
    
    winStatus.innerHTML = "The puzzle is solved!";
  }
}
