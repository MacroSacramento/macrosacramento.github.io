
var lightOrder = [];
var round = 0;
var count = 0;
var score = 0;

function startGame() {
    lightOrder = [];
    round = 0;
    count = 0;
    score = 0;

    genRandomOrder();
    game();
}

function genRandomOrder() {
    while (lightOrder.length < 25) {
        var num = Math.floor(Math.random() * 25) + 1;
        if (lightOrder.indexOf("light-" + num) === -1) {
            lightOrder.push("light-" + num)
        }
    }
    console.log(lightOrder)
}

function game() {
    blinkLight();
    for (i = 1; i <= 25; i++) {
        document.getElementsByClassName("light-" + i)[0].onclick = function () {
            if (this.className == lightOrder[count]) {
                score += 100;
                addClass(this.className, "lit");
                goNext();
                document.getElementById("score").innerHTML = score;
            } else {
                lose()
            }
        }
    }
}

function goNext() {
    if (count < round) {
        count++;
    } else if (count == round && round != 25) {
        removeClass("lit", "lit");
        count = 0;
        round++;
        game();
    } else if (round == 25) {
        win();
    }
}

async function blinkLight() {
    for (var i = 0; i <= round; i++) {
        addClass(lightOrder[i], "blink");
        await sleep(1000);
        removeClass(lightOrder[i], "blink");
    }
}

function win() {
    window.alert("You win!");
}

function lose() {
    removeClass("lit", "lit");
    window.alert("You lose!");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("start-button").onclick = function () {
    this.innerHTML = "Restart!";
    startGame();
}

function addClass(element, className) {
    console.log("click")
    document.getElementsByClassName(element)[0].classList.add(className);
}

function removeClass(element, className) {
    [].forEach.call(document.querySelectorAll("."+element),  function(e) {
        e.classList.remove(className);
    });
}