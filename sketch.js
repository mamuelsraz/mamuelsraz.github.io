var size = 28;
var canvasSize = 400;
var board;
var finalRuleSet = [];

function setup() {
  createCanvas(canvasSize, canvasSize);
  noStroke();
  scale(canvasSize / size, canvasSize / size);
  frameRate(200);

  board = new Board(size, finalRuleSet);
  drawBoard(board);
}

function draw() {
  noStroke();
  scale(canvasSize / size, canvasSize / size);

  board.Tick();
  drawBoard(board);
}

function drawBoard(board) {
  for (let x = 0; x < board.size; x++) {
    for (let y = 0; y < board.size; y++) {
      drawTile(board, x, y);
    }
  }
}

function drawTile(board, x, y) {
  var col = board.GetColor(x, y);
  if (col != null) {
    fill(color(col));
    square(x, y, 1);
  }
}
