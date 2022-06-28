
const Colors = {
    "black": "#000000",
    "red": "#ff0000",
    "white": "#ffffff",
    "blue": "#3e51c9"
}

const RuleTypes = {
    then: 0,
    rand: 1,
    or: 2
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

class RuleSet {
    constructor(rules, type) {
        this.rules = rules;
        this.type = type;
    }

    GetSelection(board) {
        var selection = [];
        switch (this.type) {
            case RuleTypes.then:
                for (let i = 0; i < this.rules.length; i++) {
                    const rule = this.rules[i];
                    selection = selection.concat(rule.GetSelection(board));
                    if (selection.length > 0) break;
                }
                break;
            case RuleTypes.rand:
                for (let i = 0; i < this.rules.length; i++) {
                    const rule = this.rules[i];
                    selection = selection.concat(rule.GetSelection(board));
                }
                break;
            case RuleTypes.or:
                shuffleArray(this.rules);
                for (let i = 0; i < this.rules.length; i++) {
                    const rule = this.rules[i];
                    selection = selection.concat(rule.GetSelection(board));
                    if (selection.length > 0) break;
                }
                break;
        }
        return selection;
    }
}

class Rule {
    constructor(leftSide, rightSide) {
        this.leftSide = leftSide;
        this.rightSide = rightSide;
        this.name = "";
    }

    GetSelection(board) {
        return board.TryRule(this);
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