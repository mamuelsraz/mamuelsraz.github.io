var display1 = function (sketch) {
    var size = 28;
    var canvasSize = 400;
    var board;
    var finalRuleSet = [new Rule([new Point(0, 0, Colors.black)], [new Point(0, 0, Colors.white)], RuleTypes.then)];

    sketch.setup = function () {
        sketch.size = 28;
        sketch.canvasSize = 400;
        sketch.finalRuleSet = [new Rule([new Point(0, 0, Colors.black)], [new Point(0, 0, Colors.white)], RuleTypes.then)];

        let canvas = sketch.createCanvas(sketch.canvasSize, sketch.canvasSize);
        sketch.noStroke();
        sketch.scale(sketch.canvasSize / sketch.size, sketch.canvasSize / sketch.size);
        sketch.frameRate(200);

        sketch.board = new Board(sketch.size, sketch.finalRuleSet);
        sketch.drawBoard(sketch.board);
    }

    sketch.customSetup = function (size, canvasSize, rules) {
        sketch.size = size;
        sketch.canvasSize = canvasSize;
        sketch.finalRuleSet = rules;

        let canvas = sketch.createCanvas(sketch.canvasSize, sketch.canvasSize);
        sketch.noStroke();
        sketch.scale(sketch.canvasSize / sketch.size, sketch.canvasSize / sketch.size);
        sketch.frameRate(200);

        sketch.board = new Board(sketch.size, sketch.finalRuleSet);
        sketch.drawBoard(sketch.board);
    }

    sketch.draw = function () {
        sketch.noStroke();
        sketch.scale(sketch.canvasSize / sketch.size, sketch.canvasSize / sketch.size);

        sketch.board.Tick();
        sketch.drawBoard(sketch.board, sketch);
    }

    sketch.drawBoard = function (board) {
        for (let x = 0; x < board.size; x++) {
            for (let y = 0; y < board.size; y++) {
                sketch.drawTile(board, x, y);
            }
        }
    }

    sketch.drawTile = function (board, x, y) {
        var col = board.GetColor(x, y);
        if (col != null) {
            sketch.fill(sketch.color(col));
            sketch.square(x, y, 1);
        }
    }
};

var display2 = display1;
var sketch = new p5(display1);
new p5(display1);

function buttonPressed() {
    sketch.customSetup(28, 400, [new Rule([new Point(0, 0, Colors.black)], [new Point(0, 0, Colors.red)], RuleTypes.then)]);
}