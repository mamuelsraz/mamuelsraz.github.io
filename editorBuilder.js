var pointElement;
var addElement;
var rulesParent;
var ruleElement;
var dividerElement;
var ruleset;

var allRuleSides = []; //WHY??????????
var allRules = [];
initialize();

function initialize() {
    ruleset = new RuleSet([], RuleTypes.then)
    document.addEventListener('contextmenu', event => event.preventDefault());
    pointElement = document.getElementById("pointTemplate");
    addElement = document.getElementById("addTemplate");
    ruleElement = document.getElementById("ruleTemplate");
    dividerElement = document.getElementById("dividerTemplate");
    rulesParent = document.getElementById("ruleset-container");
    addRule();
    drawRules();
    /*drawRule(ruleOne, null, rulesParent);*/
}

function addRule() {
    var rule = new Rule([], [])
    ruleset.rules.push(rule);
    allRules.push(rule);
    drawRules();
}

function play(){
    finalRuleSet = new RuleSet([], RuleTypes.then);

    for (let i = 0; i < ruleset.rules.length; i++) {
        var rule = ruleset.rules[i];
        rule = InitializeRotatedRule(rule);
        rule.type = RuleTypes.or;
        finalRuleSet.rules.push(rule);
    }
    console.log(finalRuleSet);
    setup();
}

function pushRule(event, element) {
    if (event.which != 3) {
        return
    }

    var index = element.dataset.index;
    ruleset.rules.splice(index, 1);
    drawRules();
}

function drawRules() {
    rulesParent.textContent = '';
    for (let i = 0; i < ruleset.rules.length; i++) {
        const rule = ruleset.rules[i];
        if (i != 0) {
            var divider = cloneElement(dividerElement, rulesParent);
            var index = allRules.indexOf(rule) - 1;
            divider.dataset.index = i;
            divider.addEventListener("mousedown", function (event) {
                pushRule(event, this);
            });
        }
        var clone = cloneElement(ruleElement, rulesParent);
        var leftParent = clone.getElementsByClassName("point-container")[0];
        var rightParent = clone.getElementsByClassName("point-container")[1];
        drawRule(rule, rightParent, leftParent);
    }
}

function drawRule(rule, rightParent, leftParent) {
    drawRuleSide(rule.leftSide, leftParent);
    drawRuleSide(rule.rightSide, rightParent);
}

function drawRuleSide(ruleSide, parent) {
    parent.textContent = '';
    if (!allRuleSides.includes(ruleSide)) allRuleSides.push(ruleSide);
    var ruleSideIndex = allRuleSides.indexOf(ruleSide);

    var furthestX = 0;
    var furthestY = 0;
    //get how big the chain is
    for (let i = 0; i < ruleSide.length; i++) {
        const point = ruleSide[i];

        if (point.x > furthestX) furthestX = point.x;
        if (point.y > furthestY) furthestY = point.y;
    }
    furthestX += 1;
    furthestY += 1;
    if (ruleSide.length > 0) {
        furthestX += 1;
        furthestY += 1;
    }

    //create elements
    var elementList = [];
    parent.style.gridTemplateColumns = "repeat(" + furthestX + ", 1fr)";
    for (let i = 0; i < furthestX * furthestY; i++) {
        var clone = cloneElement(addElement, parent);
        var pos = get2Dpos(i, furthestX);
        clone.dataset.x = pos[0];
        clone.dataset.y = pos[1];
        clone.dataset.index = -1;
        clone.dataset.ruleSideIndex = ruleSideIndex;
        elementList.push(clone);
        clone.addEventListener("click", function () {
            colorAdd(this);
        });
    }

    //create references
    for (let i = 0; i < ruleSide.length; i++) {
        const point = ruleSide[i];
        var index = getIndex(point.x, point.y, furthestX);
        elementList[index].dataset.index = i;
        elementList[index].className = "point " + getKeyByValue(Colors, point.col);
        elementList[index].removeEventListener("click", function () {
            colorAdd(this);
        });
        elementList[index].addEventListener("click", function () {
            colorPushed(this);
        });
        elementList[index].addEventListener("mousedown", function (event) {
            colorDelete(event, this);
        });
    }
}

function colorPushed(element) {
    var point = allRuleSides[element.dataset.ruleSideIndex][element.dataset.index];
    var colorIndex = Object.keys(Colors).indexOf(getKeyByValue(Colors, point.col)); //WHYYYYYYYYYYYYYYY???
    colorIndex += 1;
    if (colorIndex >= Object.keys(Colors).length) colorIndex = 0;

    point.col = Colors[Object.keys(Colors)[colorIndex]];
    element.className = "point " + getKeyByValue(Colors, point.col);
}

function colorDelete(event, element) {
    if (event.which != 3) {
        return
    }
    var ruleSide = allRuleSides[element.dataset.ruleSideIndex];
    var point = allRuleSides[element.dataset.ruleSideIndex][element.dataset.index];
    ruleSide.splice(ruleSide.indexOf(point), 1);
    drawRuleSide(ruleSide, element.parentElement);
}

function colorAdd(element) {
    if (element.className.includes("point")) return;
    var ruleSide = allRuleSides[element.dataset.ruleSideIndex];
    var x = parseInt(element.dataset.x);
    var y = parseInt(element.dataset.y);
    ruleSide.push(new Point(x, y, Colors.white));
    drawRuleSide(ruleSide, element.parentElement);
}

function get2Dpos(index, sizeX) {
    var result = [];
    result.push(index % sizeX);
    result.push(Math.floor(index / sizeX));
    return result;
}

function getIndex(x, y, sizeX) {
    return x + y * sizeX;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function cloneElement(element, parent) {
    var node = element.content.cloneNode(true);
    parent.appendChild(node);
    return parent.lastElementChild;
}