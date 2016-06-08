$("#trigger").click(function(){
	main();
});

function explain(ar2) {
	//returns x, y where initial params are on x plain
	return [ Math.floor( ( ar2[1]-ar2[0] )/2 + ar2[0]),
		Math.floor( ( ar2[1]-ar2[0] )/2) ]
}

function index(str) {
	//returns index dictionary with word: [indices]
	var arr = str.toLowerCase().match(/\w+/g);
	var ret = {};
	for (var i = 0; i < arr.length; i++) {
		if (ret[arr[i]] === undefined) {
			ret[arr[i]] = [i];
		}
		else {
			ret[arr[i]].push(i);
		}
	}
	return ret;
}

var f = document.getElementById("flag");
var ftx = f.getContext("2d");
//remember it's height and width, there is no length.

function render(arr) {
	/*
	renders array to context using the following schema:
		arr.length===1: y-parrallel line from arr[0]
		arr.length===2: semicircle with corners at (arr[0],0) and (arr[1],0)
		arr.length===3: skewLine with ends at explain(arr[0-1]), explain(arr[1-2])
		arr.length===4: quadraticCurve with point schemas as above
		arr.length===5: bezierCurve (cubic) with point schemas as above
	*/
	switch (arr.length) {
		case 1:
			ftx.beginPath();
			ftx.moveTo(arr[0],0);
			ftx.lineTo(arr[0],f.width);
			ftx.stroke();
			break;
		case 2:
			ftx.beginPath();
			ftx.arc(explain(arr)[0],0, explain(arr)[1], 0,Math.PI);
			ftx.stroke();
			break;
		case 3:
			ftx.beginPath();
			ftx.moveTo(explain(arr.slice(0,2))[0], explain(arr.slice(0,2))[1]);
			ftx.lineTo(explain(arr.slice(1,3))[0], explain(arr.slice(1,3))[1]);
			ftx.stroke();
			break;
		case 4:
			ftx.beginPath();
			ftx.moveTo(explain(arr.slice(0,2))[0], explain(arr.slice(0,2))[1]);
			ftx.quadraticCurveTo(explain(arr.slice(1,3))[0], explain(arr.slice(1,3))[1],
				explain(arr.slice(2,4))[0], explain(arr.slice(2,4))[1]);
			ftx.stroke();
			break;
		case 5:	
			ftx.beginPath();
			ftx.moveTo(explain(arr.slice(0,2))[0], explain(arr.slice(0,2))[1]);
			ftx.bezierCurveTo(explain(arr.slice(1,3))[0], explain(arr.slice(1,3))[1],
				explain(arr.slice(2,4))[0], explain(arr.slice(2,4))[1],
				explain(arr.slice(3,5))[0], explain(arr.slice(3,5))[1]);
			ftx.stroke();
			break;
			
		default:
			return null;
			break;
	}
}	

function main() {
	var text = document.getElementById("text").value;
	f.width = text.match(/\w+/g).length;
	f.height = f.width / 2;
	var i = index(text);
	for (word in i) {
		render(i[word]);
	}
}
