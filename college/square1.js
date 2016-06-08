(function(){
    var square1canvas = document.getElementById("square1canvas");
    var c2x = square1canvas.getContext("2d");
    var backgroundColor="#666666";
    var playerColor="#ff0000";
    c2x.fillStyle=backgroundColor;
    c2x.fillRect(0,0,600,600);
    
    c2x.translate(0,600);
    c2x.scale(1,-1);
    
    var playerWidth = 60;
    var playerHeight = 60;
    var playerX = 0;
    var playerY = 200;
    var playerOldX = playerX;
    var playerOldY = playerY;
    var playerVelocityY = 0;
    var playerVelocityX = 0;
    var gravity = 3;
    var jumpAcceleration = 50;
    var runAcceleration = 30;
    var runMax = 4;
    var runRightMax = -1 * runMax;
    var frictionX = 4;
    var functionalWidth = c.width - playerWidth;
    var playerRunningLeft = false;
    var playerRunningRight = false;
    
    function updateAnimation() {
        c2x.fillStyle=backgroundColor;
        c2x.fillRect(playerOldX,playerOldY,playerWidth,playerHeight);
        //c2x.clearRect(playerOldX,playerOldY,playerWidth,playerHeight);
        c2x.fillStyle=playerColor;
        c2x.fillRect(playerX,playerY,playerWidth,playerHeight);
        playerOldX=playerX;
        playerOldY=playerY;
        window.requestAnimationFrame(updateAnimation);
    }
    window.requestAnimationFrame(updateAnimation);
    
    function physics() {
        //movement in Y direction
        if (playerY + playerVelocityY > 0) {
            playerY += playerVelocityY;
        }
        else {
            playerY = 0;
            playerVelocityY = 0;
        }
        //velocity in Y direction
        if (playerY) {
            playerVelocityY -= gravity;
        }
        //movement in X direction
        if (playerX + playerVelocityX < functionalWidth) {
            if (playerX + playerVelocityX > 0) {
                playerX += playerVelocityX;
            }
            else {
                playerX = 0;
            }
        }
        else {
            playerX = functionalWidth;
        }
        //velocity in X direction
        if (playerRunningLeft) {
            if (playerVelocityX > runRightMax) {
                playerVelocityX -= runAcceleration;
            }
            else {
                playerVelocityX = runRightMax;
            }
        }
        if (playerRunningRight) {
            if (playerVelocityX < runMax) {
                playerVelocityX += runAcceleration;
            }
            else {
                playerVelocityX = runMax;
            }
        }
        if (playerVelocityX) {
            if (playerVelocityX > 0) {
                if (playerVelocityX - frictionX > 0) {
                    playerVelocityX -= frictionX;
                }
                else {
                    playerVelocityX = 0;
                }
            }
            else {
                if (playerVelocityX + frictionX < 0) {
                    playerVelocityX += frictionX;
                }
                else {
                    playerVelocityX = 0;
                }
            }
        }
        
    }
    setInterval(function(){physics()},14);
    
    window.onkeydown=function(e){
        switch(e.keyCode){
                //remember... left is 37, goes clockwise
                case 37:
                playerRunningLeft = true;
                //playerX -= runAcceleration;
                break;
                case 38:
                if (! playerY) {
                    playerVelocityY += jumpAcceleration;
                }
                break;
                case 39:
                playerRunningRight = true;
                //playerX += runAcceleration;
                break;
        }
    }
    
    window.onkeyup=function(e){
        switch(e.keyCode){
                case 37:
                playerRunningLeft = false;
                break;
                case 39:
                playerRunningRight = false;
                break;
        }
    }
    
    
    
    
    var botColor = "#0000ff";
var botWidth = playerWidth;
var botHeight = playerHeight;
var botX = 500;
var botY = 300;
var botOldX = botX;
var botOldY = botY;
var botVelocityY = 0;
var botVelocityX = 0;
//////////
var botRunningLeft = false;
var botRunningRIght = false;


function checkForWinner() {
    if (Math.abs(playerX - botX) < playerWidth) {
        if (playerY - playerHeight > botY) {
            if (playerY - playerHeight + playerVelocityY < botY + botVelocityY) {
                playerVelocityY = -playerVelocityY;
                c2x.fillText("Win...", 300, 500);
            }
        }
    }
}

setInterval(function() {checkForWinner()}, 5);

function updateBotAnimation() {
    c2x.fillStyle=backgroundColor;
    c2x.fillRect(botOldX,botOldY,botWidth,botHeight);
    //c2x.clearRect(playerOldX,playerOldY,playerWidth,playerHeight);
    c2x.fillStyle=botColor;
    c2x.fillRect(botX,botY,botWidth,botHeight);
    botOldX=botX;
    botOldY=botY;
    window.requestAnimationFrame(updateBotAnimation);
}
window.requestAnimationFrame(updateBotAnimation);

function botPhysics() {
    //movement in Y direction
    if (botY + botVelocityY > 0) {
        botY += botVelocityY;
    }
    else {
        botY = 0;
        botVelocityY = 0;
    }
    //velocity in Y direction
    if (botY) {
        botVelocityY -= gravity;
    }
    //movement in X direction
    if (botX + botVelocityX < functionalWidth) {
        if (botX + botVelocityX > 0) {
            botX += botVelocityX;
        }
        else {
            botX = 0;
        }
    }
    else {
        botX = functionalWidth;
    }
    //velocity in X direction
    if (botRunningLeft) {
        if (botVelocityX > runRightMax) {
            botVelocityX -= runAcceleration;
        }
        else {
            botVelocityX = runRightMax;
        }
    }
    if (botRunningRight) {
        if (botVelocityX < runMax) {
            botVelocityX += runAcceleration;
        }
        else {
            botVelocityX = runMax;
        }
    }
    if (botVelocityX) {
        if (botVelocityX > 0) {
            if (botVelocityX - frictionX > 0) {
                botVelocityX -= frictionX;
            }
            else {
                botVelocityX = 0;
            }
        }
        else {
            if (botVelocityX + frictionX < 0) {
                botVelocityX += frictionX;
            }
            else {
                botVelocityX = 0;
            }
        }
    }

}
setInterval(function(){botPhysics()},14);
    })();