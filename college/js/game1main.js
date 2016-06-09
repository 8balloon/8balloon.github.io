(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function character () {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.color = "#000000"

	this.dx = 0;
	this.dy = 0;
/*
	this.ddx = 0;
	this.ddy = 0;
*/
}

module.exports = character;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./character":1}],4:[function(require,module,exports){
var enemy = require("./enemy1")

var STARTING_SIZE = 20
var GROWTH_INCREMENT = 10
var MAX_SIZE = 100
var ENEMY_COLOR = "#ff0000"

var enemyArray = {
	block_size: STARTING_SIZE,
	size_increment: GROWTH_INCREMENT,
	max_block_size: MAX_SIZE,
	color: ENEMY_COLOR,
	canvas: null,
	ctx: null,
	score: 0,

	start: function(canvas, ctx) {
		enemyArray.canvas = canvas
		enemyArray.ctx = ctx
	},

	arr: [],
	spawn: function() {
		console.log("Spawned.")
		var en = enemy.create(enemyArray.block_size, enemyArray.color)
		en.x = Math.random() * (enemyArray.canvas.width - enemyArray.block_size)
		en.y = 2;
		en.dx = Math.random() * 7 + 3;
		en.dy = Math.random() * 7 + 3;

		enemyArray.arr.push(en)
		enemyArray.score++
		if (enemyArray.block_size < enemyArray.max_block_size) {
			enemyArray.block_size += enemyArray.size_increment
		}
		console.log(enemyArray.arr)
	},

	moveAll: function(backGroundColor) {
		for (var i = 0; i < enemyArray.arr.length; i++) {
			console.log(enemyArray.arr)
			enemy.move(
				enemyArray.arr[i].dx,
				enemyArray.arr[i].dy,
				enemyArray.arr[i],
				enemyArray.canvas,
				enemyArray.ctx,
				enemyArray.arr[i].color,
				backGroundColor
			)
		}
	},

	hasCollision: function(playerCircle) {
		for (var i = 0; i < enemyArray.arr.length; i++) {
			if (enemy.isColliding(enemyArray.arr[i], playerCircle)) {
				return true
			}
		}
	},

	clear: function() {
		enemyArray.arr = []
		enemyArray.block_size = STARTING_SIZE
	}
}

module.exports = enemyArray

},{"./enemy1":3}],5:[function(require,module,exports){
var input = {
	ret: [],
	/*MUST BE STARTED WITH input.start(input)
	*/
	start: function(inp) {
		$(document).keydown(function(event) {
			pressed = false;
			for (var i = 0; i < inp.ret.length; i++) {
				if (event.keyCode === inp.ret[i]) {
					pressed = true
					break
				}
			}
			if (! pressed) inp.ret.push(event.keyCode);
		})
		$(document).keyup(function(event) {
			for (var i = 0; i < inp.ret.length; i++) {
				if (event.keyCode === inp.ret[i]) {
					inp.ret.splice(i, 1)
					break
				}
			}
		})
	},
	get: function() {
		return this.ret
	},
	clear: function() {
		this.ret = []
	}
}

module.exports = input

},{}],6:[function(require,module,exports){
var input = require("./input")
var control = require("./control")
var enemy = require("./enemy1")
var playerCircle = require("./playerCircle")
var enemyArray = require("./enemyArray")

var SPAWN_INTERVAL = 10000
var BACKGROUND_COLOR = "#ffffff"
var BUFFER_INTERVAL = 30
var PLAYER_MOVE_DISTANCE = 10
var ENEMY_COLOR = "#ff0000"
var ENEMY_SIZE = 20
var c = $("#mainCanvas")[0]
var ctx = c.getContext("2d")

input.start(input)

enemyArray.start(c, ctx)
playerCircle.move(0,0)

$("#startButton").click(function() {
	ctx.clearRect(0, 0, c.width, c.height)
	playerCircle.move(0,0)
	enemyArray.spawn()
	enemyArray.spawn()
	enemyArray.spawn()

	var spawnInterval = setInterval(function() {
		enemyArray.spawn()
	}, SPAWN_INTERVAL)

	var mainInterval = setInterval(function() {
		
		control(input.get(), playerCircle, PLAYER_MOVE_DISTANCE, ctx)
		//enemy.move(en.dx, en.dy, en, c, ctx, ENEMY_COLOR, BACKGROUND_COLOR)
		enemyArray.moveAll(BACKGROUND_COLOR)
		if (enemyArray.hasCollision(playerCircle)) {
		//if (enemy.isColliding(en, playerCircle)) {
			clearInterval(spawnInterval)
			clearInterval(mainInterval)
			ctx.clearRect(c.width / 2 - 40, c.height / 2 - 20, 80, 40)
			ctx.fillText("GAME OVER", c.width/2 - 35, c.height/2)
			//put in some fancy animation to have circle move back to mid after end.

			enemyArray.clear()
		}

	}, BUFFER_INTERVAL)
})

},{"./control":2,"./enemy1":3,"./enemyArray":4,"./input":5,"./playerCircle":7}],7:[function(require,module,exports){
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

},{"./character":1}]},{},[6]);
