var cc = document.getElementById("circleCanvas");
var cctx = cc.getContext("2d");


console.log("cheese, gromit.");
console.log(cc.width);

cc.height = window.outerHeight * 0.8;
cc.width = 600 + Math.floor(Math.sqrt(window.outerWidth));

cctx.fillRect(0,0,cc.width,cc.height);