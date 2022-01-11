let score = 0;
let myLives = 5;
let stateGame = 1; //   0 >> Game Over      1 >> Continue Game
let stateLevel = 1; //  1 >> Level 1        2 >> Level 2  .....

class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update() {
        this.y -= this.speed;
        //Calculate distance between center bubbles and center Main fish
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
}

function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble());
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1);
        }
        //Calculate distance between bubbles and Main fish and increase score
        if (bubblesArray[i].distance < 0 - bubblesArray[i].radius + player.radius) {
            if (!bubblesArray[i].counted) {
                if (bubblesArray[i].sound == 'sound1') {
                    bubblePop1.play();
                }
                else {
                    bubblePop2.play();
                }
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);
            }
        }
    }
}
const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'other\\bubble1.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'other\\bubble2.wav';
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}

function gameState(value) {
    // 0 >> Change Lives
    if (value == 0) {
        if (myLives > 0) {
            myLives--;
            stateGame = 1;
            // Game Over
            if (myLives == 0) {
                stateGame = 0;
            }
            return myLives;
        }
    }
    // 1 >> Change Score
    else if (value == 1) {
        if (score < 20) {
            score++;
            // Next Level
            if (score == 20) {
                stateLevel++;
            }
            return score;
        }
    }
}

console.log(gameState(1));
