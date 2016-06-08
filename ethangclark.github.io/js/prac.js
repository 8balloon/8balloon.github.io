function sentence(str) {
	this._wordTree = {}
	this.constructor(str)
}

sentence.prototype.constructor = function(str) {
	var wordList = str.toLowerCase().match(/\w+/g)
	for (var i = 0; i < wordList.length; i++) {
		this._wordTree[wordList[i]] = i
	}
}	

//Use prototype to prevent having to recreate the function
//with every object instantiation.
//It would also be legal to write the funciton as an
//attribute of the class sentence.
sentence.prototype.getWords = function() {
	var ret = []
	for (word in this._wordTree) {
		ret.push(word)
	}
	return ret
}

//Remember the "new" constructor
var ex = new sentence("I am a cat.")

console.log(ex)
console.log(ex.getWords())
