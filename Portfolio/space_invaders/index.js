import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");                //2d pour les éléments à afficher

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "../space_invaders/images/space.png";

const PlayerBulletController = new BulletController(canvas, 10, "pink", true);
const enemyBulletController = new BulletController(canvas, 4, "yellow", false);
const enemyController = new EnemyController(canvas, enemyBulletController, PlayerBulletController);
const player = new Player(canvas, 3, PlayerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    PlayerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    console.log(isGameOver);
    }
};

function displayGameOver() {
    if(isGameOver) {
        let text = didWin ? "YOU WIN" : "GAME OVER";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "bold 60px arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height /2);
    }
};

function checkGameOver() { 
    if (isGameOver) {
        return;
    }
    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.collideWith(player)){
        isGameOver = true;
    }
    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
    }
};

setInterval(game, 1000 / 60); //en ms, = 60/1s 