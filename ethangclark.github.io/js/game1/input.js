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
