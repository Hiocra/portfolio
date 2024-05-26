export default class Player {

    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas,velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;
        this.x = canvas.width / 2;
        this.y = canvas.height - 60;
        this.width =50;
        this.height = 48;
        this.image = new Image();
        this.image.src = '../space_invaders/images/player.png';
    
        document.addEventListener("keydown",this.keydown);
        document.addEventListener("keyup",this.keyup);
    }

    draw(ctx){
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width/2, this.y, 4, 10)    //4 = vitesse missile, 10 = distance entre chaque missile
        }
        this.move();
        this.collideWithWalls(); 
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls(){
        if(this.x < 0){                                 // si objet (x) < 0
            this.x = 0;                                 // mettre x à 0 pour empêcher de sortir à gauche
        }
        if(this.x > this.canvas.width - this.width){    // si objet dépasse le canvas - sa largeur
            this.x = this.canvas.width - this.width;    // mettre l'objet à la limite droite pour pas qu'il sorte
        }
    }

    move(){
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed){
            this.x -= this.velocity;
        }
    }

    keydown = event => {
        if(event.code == "ArrowRight"){
            this.rightPressed = true;
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = true;
        }
        if(event.code == "Space"){
            this.shootPressed = true;
        }
    };

    keyup = event => {
        if(event.code == "ArrowRight"){
            this.rightPressed = false;
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = false;
        }
        if(event.code == "Space"){
            this.shootPressed = false;
        }
    }
};