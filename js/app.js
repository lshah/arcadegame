
//Entity class has a constructor object that stores common properties and methods for the Player and Enemy objects
//the contructor has x and y properties that will help identify player and enemy positions
//the update method checks if a player or enemy is out of bounds. 
//the render method render helps render the player and enemy assets on the gameboard
//collisions method checks if the player and enemy collided and if they did it returns the player to starting position

class Entity {
    constructor(){
        this.sprite = 'images/';
        this.x  = 2;
        this.y = 5;
    }

    update(dt){
        this.outOfBoundsX = this.x > 5;
        this.outOfBoundsY = this.y < 1;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    collisions(gameAsset){
        if(this.y === gameAsset.y){
            if(this.x >= gameAsset.x - 0.2 && this.x <= gameAsset.x + 0.5){
                this.lost = true;
                alert("Game Over! Start again!");
                return true;
            }
        }
        else {
            return false;
        }
    }
}


//Player class extends the Entity class so it has access to it's properties and methods
//the sprite property draws the player on the gameboard
//the isMoving property keep track of when the player is isMoving 
//the win property checks if the player successfully reached the water
//render method drawers the player on the board and keep track of whether the player is isMoving or not
//update method checks if player is out of bounds. If a player is out of bounds they are returned to starting positions
//restart method sets player position to starting position if the player has won
//handleInput method allow the player to move 

class Player extends Entity{
    constructor(){
        super();
        this.sprite += 'char-cat-girl.png';
        this.isMoving = false;
        this.win = false;
        this.lost = false;
    }


    render(){
        super.render();
        this.isMoving = false;
    }

    update(dt){
        super.update();
        if(this.outOfBoundsY && this.isMoving != true && this.win != true){
            alert("You Won!");
            this.win = true;
        }
    }

    restart(){
        if(this.isMoving == false && this.win == true){
            this.y = this.y+5;
            this.win = false;
            this.lost = false;
        }
    }


    handleInput(input) {
        if(input == 'left' && this.x > 0){
            console.log(input);
            this.x = this.x-1;
        }
        else {
            this.x = this.x;
        }


        if(input == 'up' && this.y > 0){
            console.log(input);
            this.y = this.y-1;
        }
        else {
            this.y = this.y;
        }


        if(input == 'right' && this.x < 4){
            console.log(input);
            this.x = this.x+1;
        }
        else {
            this.x = this.x;
        }

        if(input == 'down' && this.y < 5){
            console.log(input);
            this.y = this.y+1;
        }
        else {
            this.y = this.y;
        }

            this.isMoving = true;


    }

}

//Enemy class extends the Entity class so it has access to it's properties and methods
//the sprite property draws the enemy on the gameboard
//the update method checks if the enemy is out of bounds. If an enemy is out of bounds they move off the screen and re-enter at starting position


class Enemy extends Entity{
    constructor(x, y){
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    update(dt){
        super.update();
        if(this.outOfBoundsX){
            this.x = -1;
        }
        else {
            this.x += 2*dt*Math.floor(Math.random()*3 + 1);
        }
    }
}


//store Player and Enemy objects in a variable
//enemies are created at random locations along the y axis
const player = new Player();

const allEnemies = [...Array(4)].map(function(enemy){
    for(let i=0; i<4; i++){
        return new Enemy(null,Math.floor(Math.random()*3)+1);
    }
});



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    
});
