function prep() {
	var text = document.getElementById('text');
	var btn = document.getElementById('begin');
	var btn2 = document.getElementById('stop');

	var CANVAS_WIDTH = document.documentElement.clientWidth;
	var CANVAS_HEIGHT = document.documentElement.clientHeight;
	var beginTime = new Date();
	var texts = [];
	var canvas = document.getElementById('canvas');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#9e9e9e";


	var result = true;
	fly = setInterval(function() {
				render(ctx);
				update();

			}, 70);
	btn.onclick = function() {
		if (result == true) {
			begin = setInterval(function() {
				randomBegin();
			}, 50);

			result = false;
			btn.innerHTML = "停止";
		} else {
			clearInterval(begin);
			result = true;
			btn.innerHTML = "开始";
		}
	}

	function randomBegin() {
		var i = Math.floor(Math.random() * menu.length);
		text.innerHTML = menu[i];
	}

	function render(ctx) {
		if (result == false) {
			ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			var aText = {
				"x": Math.round(Math.random() * CANVAS_WIDTH),
				"y": Math.round(Math.random() * CANVAS_HEIGHT),
				"text": menu[Math.floor(Math.random() * menu.length)],
				"opacity": 1,
				"vOpacity": 0.04, //文字衰减速度
				"fontSize": Math.round(Math.random() * 24 + 14)
			};
			if (aText.x - aText.fontSize < 0) {  //防止文字出边

				aText.x += aText.fontSize;
			}
			if (aText.x + 3*aText.fontSize > CANVAS_WIDTH) {
				aText.x -= 3*aText.fontSize;
			}
			if (aText.y - aText.fontSize < 0) {
				aText.y += aText.fontSize;
			}
			if (aText.y + aText.fontSize > CANVAS_HEIGHT) {
				aText.y -= aText.fontSize;
			}
			aText.fontSize += "px";
			texts.push(aText);
			renderText();
		} else {
			ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //这句不加 暂停之后不会慢慢消失
			renderText();
		}

	}

	function renderText() {
		for (var i = 0; i < texts.length; i++) {
			ctx.beginPath();
			ctx.font = "200 " + texts[i].fontSize + " 微软雅黑";
			// "200 " +'"'texts[i].fontSize'"'+" 微软雅黑"
			ctx.globalAlpha = texts[i].opacity;
			// console.log(texts[i].opacity);
			ctx.fillText(texts[i].text, texts[i].x, texts[i].y);
			ctx.closePath();
		}
	}

	function update() {
		console.log(texts.length);
		for (var i = 0; i < texts.length; i++) {
			if (texts[i].opacity - texts[i].vOpacity < 0) {
				texts[i].opacity = 0;
			} else {
				texts[i].opacity = texts[i].opacity - texts[i].vOpacity;
			}
		}
		var cnt = 0;
		for (var i = 0; i < texts.length; i++) { //清除多余的文字
			if (texts[i].opacity > 0) {
				texts[cnt++] = texts[i];
			}
		}
		while (texts.length > cnt) {
			texts.pop();
		}

	}

}

// setInterval(function() {
// 	update();
// }, 50);
// fly=setInterval(function() {
// 			render(ctx);update();

// }, 70);

// for (var i = 0; i < menu.length; i++) {
// 	var x = Math.random() * CANVAS_WIDTH;
// 	var y = Math.random() * CANVAS_HEIGHT;
// 	ctx.fillText(menu[i], x, y);
// }

// function getCurTime() {
// 	var curTime=new Date();
// 	var ret=curTime.getTime()-beginTime.getTime();
// 	console.log(ret);
// }

addOnLoad(prep);
