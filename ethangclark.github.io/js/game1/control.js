//var playerCircle = require("./playerCircle")

function control(inputArr, playerCircle, move_distance, ctx) {
	var totalRight = 0
	var totalDown = 0

	for (var i = 0; i < inputArr.length; i++) {
		switch (inputArr[i]) {
			case 65: //left
				//playerCircle.move(-1 * move_distance, 0);
				totalRight--
				break;
			case 68: //right
				//playerCircle.move(move_distance, 0);
				totalRight++
				break;
			case 83: //down
				//playerCircle.move(0, move_distance);
				totalDown++
				break;
			case 87: //up
				//playerCircle.move(0, -1 * move_distance)
				totalDown--
				break;
			//default:
		}
	}

	if (totalRight && totalDown) {
		playerCircle.move(
			Math.SQRT1_2 * totalRight * move_distance, 
			Math.SQRT1_2 * totalDown * move_distance
		)
	}
	else {
		playerCircle.move(totalRight * move_distance, totalDown * move_distance)
	}
}

module.exports = control
