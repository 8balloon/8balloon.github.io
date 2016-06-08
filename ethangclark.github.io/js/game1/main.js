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
