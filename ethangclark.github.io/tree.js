var c = document.getElementById("treeCanvas");
var ctx = c.getContext("2d");

function mainTree() {
    ctx.save();
    ctx.translate(300, 800);
    ctx.scale(1, -1);

    ctx.lineWidth=5;
    //ctx.strokeStyle="#660066";
    ctx.strokeStyle="#"+Math.floor(Math.random()*Math.pow(256,3)).toString(16);

    var branches = [[0, 0, 2, 100]];
    var next = [];

    for (var i = 0; i < 6; i++) {
        ctx.lineWidth = 5 - i;

        for (var b = 0; b < branches.length; b++) {
            //draw branches
            ctx.beginPath();
            ctx.moveTo(branches[b][0], branches[b][1]);
            ctx.lineTo(branches[b][2], branches[b][3]);
            ctx.stroke();


            //create new branches
            for (var j = 0; j < 2; j++) {
                next[next.length] = [branches[b][2],branches[b][3], 
                                     branches[b][2]+ Math.floor(100 * Math.random() - 50), 
                                     branches[b][3] + Math.floor(60 * Math.random() - 20) + 100]
            }
        }

        //replace old branches with new
        branches = next;
        next = [];

    }

    ctx.restore();
}

function redraw() {
    ctx.fillStyle="#666666";
    ctx.fillRect(0,0,c.width,c.height);
    mainTree();
}

                 
mainTree();