var title = document.getElementById("title");
var subtitle = document.getElementById("subtitle");

setTimeout(function() { loadLevel(0); }, 10);

loadLevel(0);

function loadLevel(index){
    var level = levels[index];
    title.innerHTML = level.levelTitle;
    subtitle.innerHTML = level.levelSubtitle;
    player_right.customSetup(28, 400, level.ruleset);
}