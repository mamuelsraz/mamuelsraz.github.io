function InitializeRotatedRule(rule) {
    ruleSet = [];
    for (let i = 0; i < 4; i++) {
        var leftSide = [];
        for (let ii = 0; ii < rule.leftSide.length; ii++) {
            leftSide.push(new Point(rule.leftSide[ii].x, rule.leftSide[ii].y, rule.leftSide[ii].col));
        }
        var rightSide = [];
        for (let ii = 0; ii < rule.rightSide.length; ii++) {
            rightSide.push(new Point(rule.rightSide[ii].x, rule.rightSide[ii].y, rule.rightSide[ii].col));
        }
        ruleSet.push(new Rule(leftSide, rightSide));
        RotateRule(ruleSet[i], i);
    }
    return new RuleSet(ruleSet, "random");
}

function RotateRule(rule, rotation) {
    for (let i = 0; i < rule.leftSide.length; i++) {
        RotatePoint(rule.leftSide[i], rotation);
    }
    for (let i = 0; i < rule.rightSide.length; i++) {
        RotatePoint(rule.rightSide[i], rotation);
    }
    rule.name = rotation;
}

function RotatePoint(point, rotation) {
    var tempPoint = new Point(point.x, point.y, null);
    if (rotation == 1) {
        point.x = -1 * tempPoint.y;
        point.y = tempPoint.x;
    }
    if (rotation == 2) {
        point.x = -1 * tempPoint.x;
        point.y = -1 * tempPoint.y;
    }
    if (rotation == 3) {
        point.x = tempPoint.y;
        point.y = -1 * tempPoint.x;
    }
}

class Board {
    constructor(size, rule) {
        this.size = size;
        this.ruleSet = rule;
        this.map = Array(size * size).fill(Colors.black);
    }

    Tick() {
        var possiblePoints = this.ruleSet.GetSelection(this);
        this.ApplyRule(possiblePoints);
    }

    ApplyRule(possiblePoints) {
        if (possiblePoints.length <= 0) return;
        var selected = possiblePoints[Math.floor(Math.random() * possiblePoints.length)];
        var rule = selected[2];
        for (let i = 0; i < rule.rightSide.length; i++) {
            const point = rule.rightSide[i];
            this.SetColor(selected[0] + point.x, selected[1] + point.y, point.col);
        }
    }

    //returns array with [x, y, rule]
    TryRule(rule) {
        var possiblePoints = [];
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.TryRuleForPosition(rule, x, y)) {
                    possiblePoints.push([x, y, rule])
                }
            }
        }

        return possiblePoints;
    }

    TryRuleForPosition(rule, x, y) {
        const leftSidePoints = rule.leftSide;
        const rightSidePoints = rule.rightSide;
        if (!this.ArePointsInside(leftSidePoints, x, y)) return false; //left side
        //if (!this.ArePointsInside(rightSidePoints, x, y)) return false; //right side

        for (let i = 0; i < leftSidePoints.length; i++) {
            const point = leftSidePoints[i];
            if(!CompareColors(point.col, this.GetColor(x + point.x, y + point.y))) return false;
        }

        return true;
    }

    ArePointsInside(points, x, y) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (!this.IsInside(point.x + x, point.y + y)) return false;
        }
        return true;
    }

    SetColor(x, y, col) {
        if (!this.IsInside(x, y)) return null;
        this.map[x + y * this.size] = col;
    }

    GetColor(x, y) {
        if (!this.IsInside(x, y)) return null;
        return this.map[x + y * this.size];
    }

    IsInside(x, y) {
        if (x < 0 || y < 0) return false;
        if (x > this.size - 1 || y > this.size - 1) return false;
        return true;
    }
}

function CompareColors(first, last) {
    if (first == null || last == null) return false;
    if (first == last) return true;
    return false;
}
