var character = require("./character")

var RADIUS = 5
  , Z_SCORE = 3 //Z_SCORE=5 means it will render after z_scores of 0-4
  , COLOR = "#000000"
  , BACKGROUND_COLOR = "#ffffff"
  , MAX_X = $("#mainCanvas").width()
  , MIN_X = 0
  , MAX_Y = $("#mainCanvas").height()
  , MIN_Y = 0

var circle = new character()
  , ctx = $("#mainCanvas")[0].getContext("2d")

circle.x = MAX_X / 2
circle.y = MAX_Y / 2
circle.z = Z_SCORE
circle.radius = RADIUS
circle.color = COLOR

circle.move = function(x, y) {
	circle.render(ctx, BACKGROUND_COLOR)
	if ((circle.x + x) < MAX_X) {
		if ((circle.x + x) > MIN_X) {
			circle.x += x
		}
		else circle.x = MIN_Y
	}
	else circle.x = MAX_X

	if ((circle.y + y) < MAX_Y) {
		if ((circle.y + y) > MIN_Y) {
			circle.y += y
		}
		else circle.y = MIN_Y
	}
	else circle.y = MAX_Y
	
	circle.render(ctx, COLOR)
}

circle.render = function(ctx, color) {
	ctx.fillStyle = color
	ctx.beginPath()
	ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI)
	ctx.fill()
}

module.exports = circle
