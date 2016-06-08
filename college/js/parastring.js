module.exports = parastring;

var SENTENCE = /([^\n?!]+[.?!])|\n/g
var WORD = /\w+/g

var out = "";
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
	out += chunk;
});
process.stdin.on('end', function() {
	out = parastring(out);
	process.stdout.write(out);
});

function parastring(string) {

	function sentence_tokenize(string) {return string.match(SENTENCE);};
	function word_tokenize(string) {return string.toLowerCase().match(WORD);};
	var sentences = sentence_tokenize(string);
	process.stdout.write(sentences.length);
	var para_sentences = new Array(sentences.length);

	var word_sent_index = {};
	//word: [sent_number(s)]
	var these_words = [];
	for (var s_idx = 0; s_idx < sentences.length; s_idx++) {
		these_words = word_tokenize(sentences[s_idx]);
		if (these_words) {
			for (var w_idx = 0; w_idx < these_words.length; w_idx++) {
				if (word_sent_index[these_words[w_idx]] === undefined) {
					word_sent_index[these_words[w_idx]] = [s_idx];
				}
				else {
					word_sent_index[these_words[w_idx]].push(s_idx);
				}
			}
		}
	}

	var min_link = [];
	/*
	We are going through every word in every sentence, finding
	the word with the lowest number of indexes that's >= 2.
	We're going to swap the sentence for the other sentence
	in which that word occurs (in the para_sentences array,
	that is).

	In cases where there are multiple of these "links" of >=2
	occurrences, we are choosing the first one we come across
	because it makes things much simpler.

	In cases of > 2 indexes, we're replacing the scrutinized
	sentence with the NEXT sentence in the string. This is
	somewhat arbitrary, but we need to pick one way or another
	and this way felt best.
	*/
	var these_words = [];
	var alt_idx = 0;
	for (var s_idx = 0; s_idx < para_sentences.length; s_idx++) {
	//iterating through sentences
		these_words = word_tokenize(sentences[s_idx]);
		if (these_words) {
			for (var w_idx = 0; w_idx < these_words.length; w_idx++) {
			//iterating through words in the sentence
				if (word_sent_index[these_words[w_idx]].length >= 2) {
					if (min_link.length < 2) {
					//if there's no min link yet established
						min_link = word_sent_index[these_words[w_idx]];
					}
					else {
						if (word_sent_index[these_words[w_idx]].length < min_link.length) {
						//could have a delta comparison here, but we're going with keeping
						//the first shortest one for simplicity's sake. Hence <, not <=
							min_link = word_sent_index[these_words[w_idx]];
						}
					}
				}
			}
			for (var inner_idx = 0; inner_idx < min_link.length; inner_idx++) {
				if (min_link[inner_idx] > s_idx) {
					para_sentences[s_idx] = sentences[min_link[inner_idx]];
					break;
				}
			}
			if (! para_sentences[s_idx]) {
			//this is for if there's no greater idx in the link (it puts the first 
			//idx in the last spot, since it shifts them all "left")
				para_sentences[s_idx] = sentences[min_link[0]];
			}
			min_link = [];
		}
		else {
			para_sentences[s_idx] = "\n";
		}
	}
	return para_sentences.join(" ");
};
