
const Colors = {
    "black": "#000000",
    "red": "#ff0000",
    "white": "#ffffff",
    "blue": "#3e51c9",
    "green": "#4dbd60",
    "yellow": "#fcfc3a"
}

const RuleTypes = {
    then: 0,
    rand: 1,
    or: 2,
    runOnce: 3,
    runThree: 4,
    runTen: 5
}

class ColorPoint {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
    }
}

class Point {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.rule = null;
    }
}

class Rule {
    constructor(leftSide, rightSide, type) {
        this.leftSide = leftSide;
        this.rightSide = rightSide;
        this.type = type;
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}