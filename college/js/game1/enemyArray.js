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
