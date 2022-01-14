const livesContainer = document.getElementById("lives");
const heart = document.getElementsByClassName("live");

const gameOverContainer = document.getElementsByClassName("game-over")[0];
// const gameSuccessContainer = document.getElementsByClassName("game-success")[0];
const imageStateGame = document.getElementById("imageStateGame");
const numberScore = document.getElementById("number-score");

const homeButton = document.getElementById("home");
const playAgainButton = document.getElementById("play-again");

// progress bar
const levelOne = document.getElementById("level-1");
const levelTwo = document.getElementById("level-2");
const levelThree = document.getElementById("level-3");

const localLevel = localStorage.getItem("level");
console.log(localLevel);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolet
// Sound
if (!localStorage.getItem("firstScore")) {
  localStorage.setItem("firstScore", 0);
  localStorage.setItem("secondScore", 0);
  localStorage.setItem("thirdScore", 0);
}
if (localStorage.getItem("Status") == 0) {
  localStorage.setItem("lives", 5);
  localStorage.setItem("score", 0);
  localStorage.setItem("stateLevel", 1);
}
let score;
score = localStorage.getItem("score");
let myLives;
myLives = localStorage.getItem("lives") || 5;
let stateLevel;
stateLevel = localStorage.getItem("stateLevel");
let stateGame = 1; //   0 >> Game Over      1 >> Continue Game
let audio;
let audioEat;

// pause game
let pause = false;
let win = false;
const pauseAndPlayImg = document.getElementById("pauseAndPlayImg");

//  games
const handleLives = () => {
  // livesContainer.innerHTML = "";
  if (myLives != 5) {
    heart[myLives].src = "imgs/heart-outline.png";
  }
};

let nextLevel;
let bigFishesNo;
if (localLevel == "Easy") {
  nextLevel = 5;
  bigFishesNo = 3;
} else if (localLevel == "Medium") {
  nextLevel = 10;
  bigFishesNo = 4;
} else if (localLevel == "Difficult") {
  nextLevel = 15;
  bigFishesNo = 5;
}

const handleProgressBar = (score) => {
  let getScore;

  if (score == nextLevel * 3) {
    ctx.clearRect(0, 0, canvas.Width, canvas.Width);
    win = true;
    imageStateGame.src = "imgs/success.png";
    gameOverContainer.style.display = "block";
  }

  if (score <= nextLevel) {
    getScore = (100 / nextLevel) * score;
    levelOne.style = `background-color:#c0c050; width:${getScore}px`;
  } else if (score <= nextLevel * 2) {
    getScore = (100 / (nextLevel * 2)) * score;
    levelTwo.style = `background-color:#bf4d22; width:${getScore}px`;
  } else if (score <= nextLevel * 3) {
    getScore = (100 / (nextLevel * 3)) * score;
    levelThree.style = `background-color:#7a1285; width:${getScore}px`;
  }
};

function gameState(value) {
  // 0 >> Change Lives

  if (value == 0) {
    myLives--;

    if (myLives) {
      localStorage.setItem("lives", myLives);

      player.eaten = true;
      setTimeout(() => {
        player.eaten = false;
      }, 1000);
    } else {
      stateGame = 0;
    }
  }

  // 1 >> Change Score
  else if (value == 1) {
    score++;
    localStorage.setItem("score", score);
    handleProgressBar(score);
    // Next Level
    if (score % nextLevel == 0) {
      if (stateLevel < 3) {
        stateLevel++;
        localStorage.setItem("stateLevel", stateLevel);
      }
    }
  }
}
const sound = () => {
  audio = document.createElement("audio");
  audio.setAttribute("src", "other/GameSound.mp3");
  audio.setAttribute("controls", "controls");
};
const soundEat = () => {
  audioEat = document.createElement("audio");
  audioEat.setAttribute("src", "other/eating.mp3");
  audioEat.setAttribute("controls", "controls");
};

const soundEatPlay = () => {
  audioEat.currentTime = 2;
  audioEat.play();
};

sound();
soundEat();
handleLives();

// audio.play()
// audio.loop()
//player
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};
canvas.addEventListener("mouseup", () => {
  mouse.click = false;
});

canvas.addEventListener("mousedown", (e) => {
  mouse.click = true;
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  // console.log(mouse.x,mouse.y);
});

homeButton.onclick = () => {
  localStorage.setItem("Status", 0);
  window.location.replace("index.html");
};

playAgainButton.onclick = () => {
  localStorage.setItem("Status", 0);
  window.location.reload();
};
// function Buttons() {
//   if (
//     mouse.x > canvas.width / 2 - 100 &&
//     mouse.x < canvas.width / 2 + 100 &&
//     mouse.y > canvas.height / 2 + 20 &&
//     mouse.y < canvas.height / 2 + 100
//   ) {
//     localStorage.setItem("Status", 0);
//     window.location.reload();
//   }
//   if (
//     mouse.x > canvas.width / 2 - 100 &&
//     mouse.x < canvas.width / 2 + 100 &&
//     mouse.y > canvas.height / 2 + 120 &&
//     mouse.y < canvas.height / 2 + 200
//   ) {
//     localStorage.setItem("Status", 0);
//     window.location.replace("index.html");
//   }
// }

const playerLeft = new Image();
playerLeft.src = "imgs/fish_swim_left.png";
const playerRight = new Image();
playerRight.src = "imgs/fish_swim_right.png";

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spirteWidth = 498;
    this.spirtheight = 327;
    this.Width = this.spirteWidth / 4;
    this.Height = this.spirtheight / 4;
    this.centerY = 45;
    this.centerX = 60;
    this.size = 1.5;
    this.counter = 0;
    this.eaten = false;
  }
  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if (mouse.x != this.x) {
      this.x -= dx / 30;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 30;
    }
    if (stateLevel == 2) {
      this.Width = this.spirteWidth / 3;
      this.Height = this.spirtheight / 3;
      this.size = 2.5;
      this.radius = 65;
    }
    if (stateLevel == 3) {
      this.Width = this.spirteWidth / 2;
      this.Height = this.spirtheight / 2;
      this.size = 3.5;
      this.radius = 90;
    }
  }
  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0)";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // ctx.fillRect(this.x,this.y,this.radius,10);
    if (stateGame == 0) {
      if (score > localStorage.getItem("firstScore")) {
        localStorage.setItem("thirdScore", localStorage.getItem("secondScore"));
        localStorage.setItem("secondScore", localStorage.getItem("firstScore"));
        localStorage.setItem("firstScore", score);
      } else if (score > localStorage.getItem("secondScore")) {
        localStorage.setItem("thirdScore", localStorage.getItem("secondScore"));
        localStorage.setItem("secondScore", score);
      } else if (score > localStorage.getItem("thirdScore")) {
        localStorage.setItem("thirdScore", score);
      }
      localStorage.setItem("stateLevel", 1);
      localStorage.setItem("score", 0);
      localStorage.setItem("lives", 5);

      ctx.clearRect(0, 0, canvas.Width, canvas.Width);
      handleLives();
      gameOverContainer.style.display = "block";
    } else if (!this.eaten) {
      if (this.x >= mouse.x) {
        ctx.drawImage(
          playerLeft,
          this.frameX * this.spirteWidth,
          this.frameY * this.spirtheight,
          this.spirteWidth,
          this.spirtheight,
          this.x - (4 / 3) * this.radius,
          this.y - (3 / 4) * this.radius,
          this.Width,
          this.Height
        );
      } else {
        ctx.drawImage(
          playerRight,
          this.frameX * this.spirteWidth,
          this.frameY * this.spirtheight,
          this.spirteWidth,
          this.spirtheight,
          this.x - (4 / 3) * this.radius,
          this.y - (3 / 4) * this.radius,
          this.Width,
          this.Height
        );
      }
    } else {
      ctx.clearRect(0, 0, canvas.Width, canvas.Width);
    }
  }
}
//smallFishEnemies
//mediumFishEnemies
//largFishEnemies
// Enemie Fish
const typeOfEnemies = [
  {
    id: 1,
    type: "small",
    imageFish: [
      "imgs/smallfish/1.png",
      "imgs/smallfish/2.png",
      "imgs/smallfish/3.png",
      "imgs/smallfish/4.png",
      "imgs/smallfish/5.png",
      "imgs/smallfish/6.png",
      "imgs/smallfish/7.png",
      "imgs/smallfish/8.png",
      "imgs/smallfish/9.png",
      "imgs/smallfish/10.png",
      "imgs/smallfish/11.png",
      "imgs/smallfish/12.png",
      "imgs/smallfish/13.png",
      "imgs/smallfish/14.png",
      "imgs/smallfish/15.png",
      "imgs/smallfish/16.png",
      "imgs/smallfish/17.png",
      "imgs/smallfish/18.png",
      "imgs/smallfish/19.png",
      "imgs/smallfish/20.png",
      "imgs/smallfish/21.png",
      "imgs/smallfish/22.png",
      "imgs/smallfish/23.png",
    ],
    radius: 20,
    spriteWidth: 600,
    spriteHeight: 300,
    width: 100,
    height: 100,
    xConstant: 50,
    yConstant: 60,
    apperanceForword: true,
  },
  {
    id: 2,
    type: "medium",
    imageFish: [
      "imgs/mediumfish/1.png",
      "imgs/mediumfish/2.png",
      "imgs/mediumfish/3.png",
      "imgs/mediumfish/4.png",
      "imgs/mediumfish/5.png",
      "imgs/mediumfish/6.png",
      "imgs/mediumfish/7.png",
      "imgs/mediumfish/8.png",
      "imgs/mediumfish/9.png",
      "imgs/mediumfish/10.png",
      "imgs/mediumfish/11.png",
      "imgs/mediumfish/12.png",
    ],
    radius: 35,
    spriteWidth: 350,
    spriteHeight: 220,
    width: 190,
    height: 190,
    xConstant: 65,
    yConstant: 65,
    apperanceForword: true,
  },
  {
    id: 3,
    type: "larg",
    imageFish: [
      "imgs/largfish/1.png",
      "imgs/largfish/2.png",
      "imgs/largfish/3.png",
      "imgs/largfish/4.png",
      "imgs/largfish/5.png",
      "imgs/largfish/6.png",
      "imgs/largfish/7.png",
      "imgs/largfish/8.png",
      "imgs/largfish/9.png",
      "imgs/largfish/10.png",
      "imgs/largfish/11.png",
      "imgs/largfish/12.png",
      "imgs/largfish/13.png",
      "imgs/largfish/14.png",
      "imgs/largfish/15.png",
      "imgs/largfish/16.png",
      "imgs/largfish/17.png",
      "imgs/largfish/18.png",
      "imgs/largfish/19.png",
      "imgs/largfish/20.png",
    ],
    radius: 50,
    spriteWidth: 500,
    spriteHeight: 450,
    width: 210,
    height: 210,
    xConstant: 85,
    yConstant: 90,
    apperanceForword: true,
  },
];

let gameFrame = 0;

const enemies = [];
const enemiesDie = [];

class FishEnemies {
  constructor({ ...propertiesFish }) {
    this.id = propertiesFish.id;
    this.x = propertiesFish.apperanceForword
      ? -100 + (1 + Math.random())
      : canvas.width * (1 + Math.random());
    this.y = Math.random() * canvas.height;
    this.radius = propertiesFish.radius;
    this.type = propertiesFish.type;
    this.imageFish = propertiesFish.imageFish;
    this.speed = Math.random() * -5 + -1;
    this.frame = 0;
    this.distance;
    this.distance2;
    // this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    this.spriteWidth = propertiesFish.spriteWidth;
    this.spriteHeight = propertiesFish.spriteHeight;

    this.width = propertiesFish.width;
    this.height = propertiesFish.height;

    this.xConstant = propertiesFish.xConstant;
    this.yConstant = propertiesFish.yConstant;

    this.apperanceForword = propertiesFish.apperanceForword;
    this.toDie = 1;
  }

  update() {
    if (this.apperanceForword) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
    this.counted = false;
  }

  updateWhenDie() {
    this.toDie -= 0.1;
  }

  drawWhenDie() {
    const img = new Image();
    // if (gameFrame % 10 == 0) {
    img.src = this.imageFish[this.frame];
    ctx.translate(this.x, this.y);
    ctx.scale(-this.toDie, this.toDie);
    ctx.drawImage(
      img,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      -this.xConstant,
      -this.yConstant,
      this.width,
      this.height
    );

    // always clean up -- reset transformations to default
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  draw() {
    const img = new Image();
    // if (gameFrame % 10 == 0) {
    img.src = this.imageFish[this.frame];

    this.frame = this.imageFish.length == this.frame + 1 ? 0 : ++this.frame;
    // }
    if (!stateGame) {
      ctx.clearRect(0, 0, canvas.Width, canvas.Width);
    } else {
      if (this.apperanceForword) {
        ctx.translate(this.x, this.y);

        ctx.scale(-1, 1);
        // draw the img

        ctx.drawImage(
          img,
          0,
          0,
          this.spriteWidth,
          this.spriteHeight,
          -this.xConstant,
          -this.yConstant,
          this.width,
          this.height
        );

        // always clean up -- reset transformations to default
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        ctx.drawImage(
          img,
          0,
          0,
          this.spriteWidth,
          this.spriteHeight,
          this.x - this.xConstant,
          this.y - this.yConstant,
          this.width,
          this.height
        );
      }
    }
  }
}

const handleEnemies = () => {
  for (let i = 0; i < enemies.length; i++) {
    let dx = enemies[i].x - player.x;
    let dy = enemies[i].y - player.y;
    enemies[i].distance2 = Math.sqrt(dx * dx + dy * dy);

    if (enemies[i].distance2 < enemies[i].radius + player.radius) {
      if (!player.eaten) {
        if (!enemies[i].counted) {
          enemies[i].counted = true;
          if (enemies[i].id > player.size) {
            player.x = mouse.x = canvas.width / 2;
            player.y = mouse.y = canvas.height / 2;
            gameState(0);
            handleLives();
          } else {
            soundEatPlay();
            enemiesDie.push(enemies[i]);
            enemies.splice(i, 1);
            gameState(1);
          }
        }
      }
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x < -100 && !enemies[i].apperanceForword) {
      enemies.splice(i, 1);
    }
    if (enemies[i].x > canvas.width + 100 && enemies[i].apperanceForword) {
      enemies.splice(i, 1);
    }
  }

  for (let i = 0; i < enemiesDie.length; i++) {
    if (enemiesDie[i].toDie < 0) {
      enemiesDie.splice(i, 1);
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    for (let j = i + 1; j < enemies.length; j++) {
      let dx = enemies[i].x - enemies[j].x;
      let dy = enemies[i].y - enemies[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < enemies[i].radius + enemies[j].radius) {
        if (enemies[i].id != enemies[j].id) {
          // console.log("eat")
          let removeWhichIndex = enemies[i].id > enemies[j].id ? j : i;
          soundEatPlay();
          enemiesDie.push(enemies[removeWhichIndex]);
          enemies.splice(removeWhichIndex, 1);
        }
      }
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
  }

  for (let k = 0; k < enemiesDie.length; k++) {
    enemiesDie[k].updateWhenDie();
    enemiesDie[k].drawWhenDie();
  }

  if (gameFrame % 70 == 0) {
    let chooseFishToInsert = Math.floor(Math.random() * (3 - 0)) + 0;
    let bigFishs = enemies.filter((fish) => fish.id == 3).length;
    let mediumFishs = enemies.filter((fish) => fish.id == 2).length;

    if (bigFishs >= bigFishesNo && chooseFishToInsert == 2) {
      chooseFishToInsert = Math.floor(Math.random() * (2 - 0)) + 0;
    } else if (mediumFishs > bigFishesNo + 1 && chooseFishToInsert == 1) {
      chooseFishToInsert = 0;
    }
    let apperanceForword = Math.floor(Math.random() * (2 - 0)) + 0 == 1;
    enemies.push(
      new FishEnemies({
        ...typeOfEnemies[chooseFishToInsert],
        apperanceForword: apperanceForword,
      })
    );
  }
};

// Bubbles
const bubblesArray = [];
const bubble = new Image();
bubble.src = "imgs/fx_bubble_d0.png";
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    // this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    // this.sound = Math.random() <= 0.5 ? 'FF2.mo3';
    this.spriteWidth = 100;
    this.spriteHeight = 100;
  }
  update() {
    this.y -= this.speed;
  }
  draw() {
    ctx.drawImage(
      bubble,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 68,
      this.y - 68,
      this.spriteWidth * 1.5,
      this.spriteHeight * 1.5
    );
  }
}
function handleBubbles() {
  for (let i = 0; i < bubblesArray.length; i++) {
    // console.log(bubblesArray.length)
    if (bubblesArray[i].y < -25) {
      bubblesArray.splice(i, 1);
      // console.log(bubblesArray.length)
    }
  }
  for (let i = 0; i < bubblesArray.length; i++) {
    bubblesArray[i].update();
    bubblesArray[i].draw();
  }
  if (gameFrame % 50 == 0) {
    bubblesArray.push(new Bubble());
  }
}

const player = new Player();

const addPauseAndPlay = () => {
  if (pause) {
    pauseAndPlayImg.src = "imgs/play.png";
  } else {
    pauseAndPlayImg.src = "imgs/pause.png";
  }
};

pauseAndPlayImg.addEventListener("click", (e) => {
  pause = !pause;
  if (!pause) {
    initEnemies();
  }
});

const initEnemies = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "black";
  numberScore.textContent = score;
  // ctx.fillText("Score:" + score, 10, 30);
  // ctx.fillText("Lives:"+myLives, canvas.width-130, 30);
  addPauseAndPlay();
  handleBubbles();
  handleEnemies();
  gameFrame++;

  player.update();
  player.draw();

  if (stateGame && !pause && !win) {
    requestAnimationFrame(initEnemies);
  }
};

initEnemies();
