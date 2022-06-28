var size = 25;
var canvasSize = 400;
var board;
var finalRuleSet = new RuleSet([], RuleTypes.or);
function setup() {
  createCanvas(canvasSize, canvasSize);
  noStroke();
  scale(canvasSize / size, canvasSize / size);
  frameRate(200);

  /*var ruleOne = new Rule([new Point(0, 0, Colors.red), new Point(1, 0, Colors.black), new Point(2, 0, Colors.black)],
  [new Point(0, 0, Colors.white), new Point(1, 0, Colors.white), new Point(2, 0, Colors.red)]);
  ruleOne = InitializeRotatedRule(ruleOne);
  var ruleTwo = new Rule([new Point(0, 0, Colors.red), new Point(2, 0, Colors.white)],
  [new Point(0, 0, Colors.white), new Point(2, 0, Colors.red)])
  ruleTwo = InitializeRotatedRule(ruleTwo);

  var ruleset = new RuleSet([ruleOne, ruleTwo], "then");*/
  board = new Board(size, finalRuleSet);
  //board.SetColor(10, 10, Colors.red);
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
