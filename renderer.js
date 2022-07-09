var display1 = function (sketch) {
    sketch.setup = function () {
        sketch.size = 28;
        sketch.canvasSize = 400;
        sketch.finalRuleSet = [];

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

    sketch.resetBoard = function () {
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

    sketch.pause = function () {
        sketch.frameRate(0);
    }

    sketch.unpause = function () {
        sketch.frameRate(200);
    }
};

var display2 = display1;
var player_left = new p5(display1, "canvas-holder-left");
var player_right = new p5(display1, "canvas-holder-right");

function play() {
    finalRuleSet = [];

    for (let i = 0; i < ruleset.length; i++) {
        var rule = ruleset[i];
        if (rule.type == RuleTypes.runOnce) rule.runTime = 1;
        if (rule.type == RuleTypes.runThree) rule.runTime = 3;
        if (rule.type == RuleTypes.runTen) rule.runTime = 10;
        var ruleRotated = InitializeRotatedRule(rule);
        finalRuleSet = finalRuleSet.concat(ruleRotated);
    }

    console.log(ruleset);
    console.log(finalRuleSet);
    player_left.customSetup(28, 400, finalRuleSet);
    player_right.resetBoard();

    player_left.unpause();
    player_right.unpause();
}

var paused = false;
function pause() {
    if (paused) {
        player_left.unpause();
        player_right.unpause();
    }
    else {
        player_left.pause();
        player_right.pause();
    }

    paused = !paused;
}