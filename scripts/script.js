function canvas() {
	var CANVAS_WIDTH = document.documentElement.clientWidth;
	var CANVAS_HEIGHT = document.documentElement.clientHeight;
	var beginTime = new Date();
	var texts=[];
	var canvas = document.getElementById('canvas');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var ctx = canvas.getContext("2d");
	// ctx.font = "200 40px 微软雅黑";
	ctx.fillStyle = "#9e9e9e";
	// setInterval(function() {
	// 	update();
	// }, 50);
	setInterval(function() {
				render(ctx);update();

	}, 70);

	// for (var i = 0; i < menu.length; i++) {
	// 	var x = Math.random() * CANVAS_WIDTH;
	// 	var y = Math.random() * CANVAS_HEIGHT;
	// 	ctx.fillText(menu[i], x, y);
	// }
	function render(ctx) {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
			var aText = {
				"x": Math.round(Math.random() * CANVAS_WIDTH),
				"y": Math.round(Math.random() * CANVAS_HEIGHT),
				"text":menu[Math.floor(Math.random() * menu.length)],
				"opacity": 0.5,
				"vOpacity":0.012,
				"fontSize":Math.round(Math.random()*16+14)+"px"
			}
			texts.push(aText);
		renderText();
	}

	function renderText() {

		for (var i = 0; i < texts.length; i++) {
			ctx.beginPath();
			ctx.font= "200 30px 微软雅黑";
			 // "200 " +'"'texts[i].fontSize'"'+" 微软雅黑"
			ctx.globalAlpha = texts[i].opacity;
			ctx.fillText(texts[i].text, texts[i].x, texts[i].y);
			ctx.closePath();
		}
	}
	function update() {
		console.log(texts.length);
		for (var i = 0; i < texts.length; i++) {
			if(texts[i].opacity-texts[i].vOpacity<0){
				texts[i].opacity=0;
			}
			else{
				texts[i].opacity=texts[i].opacity-texts[i].vOpacity;
			}
		}
		  var cnt = 0;
        for (var i = 0; i < texts.length; i++) {   //清除多余的文字  
            if (texts[i].opacity>= 0 ) {
                texts[cnt++] = texts[i];
            }
        }
        while (texts.length > cnt) {
            texts.pop();
        } 

	}

	// function getCurTime() {
	// 	var curTime=new Date();
	// 	var ret=curTime.getTime()-beginTime.getTime();
	// 	console.log(ret);
	// }

}
addOnLoad(canvas);