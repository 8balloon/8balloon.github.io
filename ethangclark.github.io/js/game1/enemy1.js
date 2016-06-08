var character = require("./character")

/*
	A red square enemy. If it touches you the game ends.  */
var enemy = {
	create: function(size, color) {
		var ret = new character()
		ret.sideLength = size
		ret.color = color
		return ret
	},

	isColliding: function(en, playerCircle) {
		if (enemy.isCollidingX(en, playerCircle) && 
				(enemy.isCollidingY(en, playerCircle))) {
			return true
		}
		else return false
	},
	move: function(x, y, en, canvas, ctx, color, background_color) {
		enemy.render(en, ctx, background_color)

		if ((en.x + x) < (canvas.width - en.sideLength)) {
			if (en.x + x > 0) {
				en.x += x
			}
			else {
				en.x = 0
				en.dx *= -1
			}
		}
		else {
			en.x = canvas.width - en.sideLength
			en.dx *= -1
		}

		if ((en.y + y) < (canvas.height - en.sideLength)) {
			if ((en.y + y) > 0) {
				en.y += y
			}
			else {
				en.y = 0
				en.dy *= -1
			}
		}
		else {
			en.y = canvas.height - en.sideLength
			en.dy *= -1
		}

		enemy.render(en, ctx, color)
	},

	render: function(en, ctx, color) {
		//console.log("Rendering: ", en, ctx, color)
		ctx.beginPath()
		ctx.fillStyle = color
		ctx.rect(en.x, en.y, en.sideLength, en.sideLength)
		ctx.fill()
	},

	isCollidingX: function(en, playerCircle) {
		if (Math.abs(en.x - playerCircle.x) < (en.sideLength + playerCircle.radius)) {
			if (en.x > playerCircle.x) {
				if ((en.x - playerCircle.x) < playerCircle.radius) {
					return true
				}
				else return false
			}
			else {
				if ((playerCircle.x - en.x) < en.sideLength + playerCircle.radius) {
					return true
				}
				else return false
			}
		}
		else return false
	},
	isCollidingY: function(en, playerCircle) {
		if (Math.abs(en.y - playerCircle.y) < (en.sideLength + playerCircle.radius)) {
			if (en.y > playerCircle.y) {
				if ((en.y - playerCircle.y) < playerCircle.radius) {
					return true
				}
				else return false
			}
			else {
				if ((playerCircle.y - en.y) < en.sideLength + playerCircle.radius) {
					return true
				}
				else return false
			}
		}
		else return false
	},

}

/*
collision tests
*/
/*
var pc = {
	x: 10,
	y: 10,
	radius: 5
}
var e = enemy.create(5)

console.log("PC: ", pc)
console.log("ENEMY: ", e)
console.log("X collision: ", enemy.isCollidingX(e, pc))
console.log("Y collision: ", enemy.isCollidingY(e, pc))
console.log("Collision: ", enemy.isColliding(e, pc))
e.x = 15
e.y = 8
console.log("PC: ", pc)
console.log("ENEMY: ", e)
console.log("X collision: ", enemy.isCollidingX(e, pc))
console.log("Y collision: ", enemy.isCollidingY(e, pc))
console.log("Collision: ", enemy.isColliding(e, pc))
e.x = 12
e.y = 15
console.log("PC: ", pc)
console.log("ENEMY: ", e)
console.log("X collision: ", enemy.isCollidingX(e, pc))
console.log("Y collision: ", enemy.isCollidingY(e, pc))
console.log("Collision: ", enemy.isColliding(e, pc))
e.x = 8
e.y = 8
console.log("PC: ", pc)
console.log("ENEMY: ", e)
console.log("X collision: ", enemy.isCollidingX(e, pc))
console.log("Y collision: ", enemy.isCollidingY(e, pc))
console.log("Collision: ", enemy.isColliding(e, pc))
*/

module.exports = enemy
