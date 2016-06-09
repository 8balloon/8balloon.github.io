$(function() {

	function relativize(str, canvas) {
	/*
	Returns normalized, sparse 3d array in form:
		returnedArray[wordCountN] == 
		[[firstPositionInStringOfFirstWordWithWordCountNOccurrences, secondPositioninString...nthPositioninString], [firstPosition...], ...]
	where wordCountN is a wordcount, and xthPositionInString is a number representing the word occurrence's relative position in the string.
	Note: the words themselves are not preserved in this; it is only an array that is returned with arrays of arrays of normalized word coordinates at its indices,with the indice matching the word count.
	*/
		var arr = str.toLowerCase().match(/\w+/g);
		var ratio = canvas.width / arr.length;
		//ret is a map of word: [RelativizedWordOccurrenceIndices]
		var ret = {};
		for (var i = 0; i < arr.length; i++) {
			if (ret[arr[i]] === undefined) {
				ret[arr[i]] = [i * ratio];
			}
			else {
				ret[arr[i]].push(i * ratio);
			}
		}
		//ret2 an array, which is the final object returned.
		var ret2 = [];
		for (i in ret) {
			if (ret2[ret[i].length] === undefined) {
				ret2[ret[i].length] = [ret[i]];
			}
			else {
				ret2[ret[i].length].push(ret[i]);
			}
		}
		return ret2;
	}

	var ctx=c.getContext("2d");

	submit.onclick=function() {
		c.width = 518;
		c.height = 518;

		ctx.clearRect(0, 0, c.width, c.height);

		//this is the 3d array to be partially graphed.
		//logged for debugging purposes.
		var graph = relativize(mainInput.value, c);
		console.log(graph);

		/*
		Note: in the following functions, ar2, ar3 etc. refer to arrays of length 2, 3, etc.
		Additionally: 1-lets, 2-lets and 3-lets etc. refer to words with a total word count of 1, 2, 3 and so on.
		*/
	
		if (ones.checked) {
			//plotting 1-lets
			ctx.strokeStyle = onesColor.value;
			var foo = ctx.lineWidth;
			ctx.lineWidth = onesWidth.value;
			if (graph[1]) {
				for (var i = 0; i < graph[1].length; i++) {
					ctx.beginPath();
					ctx.moveTo(graph[1][i][0], 0);
					ctx.lineTo(graph[1][i][0], c.height);
					ctx.stroke();
				}
			}
			ctx.lineWidth = foo;
		}

		function plain(ar2, context) {
			context.beginPath();
			context.rect(ar2[0], 0, ar2[1]-ar2[0], ar2[1]-ar2[0]);
			context.fill();
			context.stroke();
		}

		function hemisphere(ar2, context) {
			context.beginPath();
			//context.arc( (ar2[1] - (ar2[1]-ar2[0]) / 2), 0, (ar2[1] - ar2[0]) / 2, 0, Math.PI);	
			context.arc( (ar2[1] - (ar2[1]-ar2[0]) / 2), ((ar2[1]-ar2[0]) / 2), (ar2[1] - ar2[0]) / 2, 0, 2* Math.PI);
			context.closePath();
			context.fill();
			if (twosStroke.checked) {
				context.stroke();
			}
		}
		
		if (twos.checked) {
			//plotting 2-lets
			//ctx.strokeStyle = "#000000";
			ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
			//ctx.fillStyle = "#ff0000";
			ctx.fillStyle = twosColor.value;
			if (graph[2]) {
				for (var i = 0; i < graph[2].length; i++) {
					//plain(graph[2][i], ctx);
					hemisphere(graph[2][i], ctx);
				}
			}
		}

		function trap(ar3, context) {
		//plots trapezoid to context from 3-ray differentials
			context.beginPath()
			//initial base line
			context.moveTo(ar3[0], ar3[1] - ar3[0]);
			context.lineTo(ar3[1], ar3[1] - ar3[0]);
			//end of base line to end of second line
			context.lineTo(ar3[2], ar3[2] - ar3[1]);
			//end of second line to front of second line
			context.lineTo(ar3[1], ar3[2] - ar3[1]);
			context.closePath();
			context.fill();
			if (threesStroke.checked) {
				context.stroke();
			}
		}

		if (threes.checked) {
			//plotting 3-lets
			//this is a trapezoid
			ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
			ctx.fillStyle = threesColor.value;
			if (graph[3]) {
				for (var i = 0; i < graph[3].length; i++) {
					trap(graph[3][i], ctx);
				}
			}
		}

		function quad(ar4, context, widthDiff) {
		//plots "quadratic slice" sort of thing
			context.beginPath();
			//lower cubic curve
			context.beginPath();
			context.moveTo(ar4[0] + (ar4[1] - ar4[0]) / 2, (ar4[1] - ar4[0]) / 2);
			context.quadraticCurveTo(
				ar4[1] + (ar4[2] - ar4[1]) / 2, (ar4[2] - ar4[1]) / 2 - widthDiff,
				ar4[2] + (ar4[3] - ar4[2]) / 2, (ar4[3] - ar4[2]) / 2
			);
			//upper cubic curve
			context.quadraticCurveTo(	
				ar4[1] + (ar4[2] - ar4[1]) / 2, (ar4[2] - ar4[1]) / 2 + widthDiff,
				ar4[0] + (ar4[1] - ar4[0]) / 2, (ar4[1] - ar4[0]) / 2
			);
			if (foursStroke.checked) {
				context.stroke();
			}
			context.fill();
		}

		if (fours.checked) {
			//plotting 4-lets
			ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
			ctx.fillStyle = foursColor.value;
			var widthCoefficient = Math.sqrt(c.width) / c.width;
			if (graph[4]) {
				for (var i = 0; i < graph[4].length; i++) {
					quad(graph[4][i], ctx, Math.max.apply(null, graph[4][i]) * widthCoefficient);
					console.log(Math.max.apply(null, graph[4][i]) * widthCoefficient);
				}
			}
		}
	}


	var sampleText = "PAUL had been many times up to Willey Farm during the autumn. He was friends with the two youngest boys. Edgar the eldest, would not condescend at first. And Miriam also refused to be approached. She was afraid of being set at nought, as by her own brothers. The girl was romantic in her soul. Everywhere was a Walter Scott heroine being loved by men with helmets or with plumes in their caps. She herself was something of a princess turned into a swine-girl in her own imagination. And she was afraid lest this boy, who, nevertheless, looked something like a Walter Scott hero, who could paint and speak French, and knew what algebra meant, and who went by train to Nottingham every day, might consider her simply as the swine-girl, unable to perceive the princess beneath; so she held aloof. Her great companion was her mother. They were both brown-eyed, and inclined to be mystical, such women as treasure religion inside them, breathe it in their nostrils, and see the whole of life in a mist thereof. So to Miriam, Christ and God made one great figure, which she loved tremblingly and passionately when a tremendous sunset burned out the western sky, and Ediths, and Lucys, and Rowenas, Brian de Bois Guilberts, Rob Roys, and Guy Mannerings, rustled the sunny leaves in the morning, or sat in her bedroom aloft, alone, when it snowed. That was life to her. For the rest, she drudged in the house, which work she would not have minded had not her clean red floor been mucked up immediately by the trampling farm-boots of her brothers. She madly wanted her little brother of four to let her swathe him and stifle him in her love; she went to church reverently, with bowed head, and quivered in anguish from the vulgarity of the other choir-girls and from the common-sounding voice of the curate; she fought with her brothers, whom she considered brutal louts; and she held not her father in too high esteem because he did not carry any mystical ideals cherished in his heart, but only wanted to have as easy a time as he could, and his meals when he was ready for them. She hated her position as swine-girl. She wanted to be considered. She wanted to learn, thinking that if she could read, as Paul said he could read, Colomba, or the Voyage autour de ma Chambre, the world would have a different face for her and a deepened respect. She could not be princess by wealth or standing. So she was mad to have learning whereon to pride herself. For she was different from other folk, and must not be scooped up among the common fry. Learning was the only distinction to which she thought to aspire. Her beauty seemed nothing to her. Even her soul, so strong for rhapsody, was not enough. She must have something to reinforce her pride, because she felt different from other people. Paul she eyed rather wistfully. On the whole, she scorned the male sex.";

	mainInput.value = sampleText;

});
