var b = document.getElementById("branchCanvas");
var btx = b.getContext("2d");
btx.font = "40pt Lucida Console";

favicon = new Image(16,16);
favicon.src="favicon.png";
favicon.onload = function() {
    btx.drawImage(favicon, b.width/4, b.height - favicon.height);
}
console.log(favicon.width);

//var blockLine=[0,0,b.width/2,0];
var blockLineHolder=[[0,0,b.width/2,0]];
var blockLineHolderPlace = 0;


var prevColor = 0;
function blockStep(heightDiff) {
    for (blockLineHolderPlace; blockLineHolderPlace < blockLineHolder.length; blockLineHolderPlace++) {
        blockLine=blockLineHolder[blockLineHolderPlace];
        console.log("pass");
        if (blockLine[1] < b.height-favicon.height) {
            btx.beginPath();
            btx.moveTo(blockLine[0],blockLine[1]);
            btx.lineTo(blockLine[2],blockLine[3]);
            btx.stroke();
            blockLine[1]+=heightDiff;
            blockLine[3]+=heightDiff;
        }
        else if (blockLine[1] < b.height) {
            if (blockLine[0] < avatarBoxCords[0]) {
                if (blockLine[2] > avatarBoxCords[0]) {
                    for (var i = 0; i < sI.length; i++) {
                        clearInterval(sI[i]);
                    }
                    console.log("Die.");
                    btx.fillStyle="#ffffff";
                    btx.fillText("Score: "+(originalMainInterval-mainInterval).toString(), 150, b.height/2);
                }
                else {
                    btx.beginPath();
                    btx.moveTo(blockLine[0],blockLine[1]);
                    btx.lineTo(blockLine[2],blockLine[3]);
                    btx.stroke();
                    blockLine[1]+=heightDiff;
                    blockLine[3]+=heightDiff;
                }
            }
            else {
                btx.beginPath();
                btx.moveTo(blockLine[0],blockLine[1]);
                btx.lineTo(blockLine[2],blockLine[3]);
                btx.stroke();
                blockLine[1]+=heightDiff;
                blockLine[3]+=heightDiff;
            }
        }
        else {
            //makes a random color
            btx.strokeStyle="#"+Math.floor(Math.random() * 16777216).toString(16);
            if (btx.strokeStyle === prevColor) {
                btx.strokeStyle="#"+Math.floor(Math.random() * 16777216).toString(16);
            }
            else {
                btx.strokeStyle="#"+Math.floor(Math.random() * 16777216).toString(16);
            }
            //btx.strokeStyle="#557799";
            blockLine[1]=0;
            blockLine[3]=0;
            if (Math.floor(Math.random() * 2)) {
                blockLine[0] = b.width/2;
                blockLine[2] = b.width;
            }
            else {
                blockLine[0] = 0;
                blockLine[2] = b.width/2;
            }
            console.log("hit bottom...");
            //sI[sI.length] = setInterval
            
            
//here's the "change something" part
            if (passCount > 2) {
                mainInterval -= 1;
                for (var i = 0; i < sI.length; i++) {
                    clearInterval(sI[i]);
                }
                sI = [setInterval(function(){blockStep(btx.lineWidth)},mainInterval)];
                passCount = 0;
            }
            else {
                passCount += 1;
            }
        }
    }
    blockLineHolderPlace=0;
}

var passCount = 0;

btx.lineWidth=10;
var sI;
var originalMainInterval = 15;
var mainInterval = originalMainInterval;


function main() {
    btx.strokeStyle="#"+Math.floor(Math.random() * 16777216).toString(16);
    if (sI) {
        for (var i = 0; i < sI.length; i++) {
            clearInterval(sI[i]);
        }
        sI = [setInterval(function(){blockStep(btx.lineWidth)},mainInterval)];
        blockLineHolder=[[0,0,b.width/2,0]];
        blockLineHolderPlace = 0;
    }
    else {
        sI = [setInterval(function(){blockStep(btx.lineWidth)},mainInterval)];
    }
    mainInterval = originalMainInterval;
}

var avatarBoxCords = [b.width/4, b.height - favicon.height]

document.onkeydown = function(e){
    switch(e.keyCode){
            case 37:
            //right arrow
            if (avatarBoxCords[0] > b.width/2) {
                btx.fillStyle="#666666";         
                btx.fillRect(avatarBoxCords[0], avatarBoxCords[1], favicon.height, favicon.height);
                btx.fillStyle="#000000";
                avatarBoxCords[0]-=b.width/2;
                btx.drawImage(favicon, avatarBoxCords[0], avatarBoxCords[1]);
            }
            break;
            
            case 39:
            //left arrow
            if (avatarBoxCords[0] < b.width/2) {
                btx.fillStyle="#666666";         
                btx.fillRect(avatarBoxCords[0], avatarBoxCords[1], favicon.height, favicon.height);
                btx.fillStyle="#000000";
                avatarBoxCords[0]+=b.width/2;
                btx.drawImage(favicon, avatarBoxCords[0], avatarBoxCords[1]);
            }
            break;
    }
}
