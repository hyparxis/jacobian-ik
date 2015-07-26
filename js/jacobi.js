var M = m4th.matrix;
var mouseClick_x, mouseClick_y = 0;
var currentAngles = [1,0,0,0];
var gui, params;
var ctx;

var init = function() {
	initGUI();
	initCanvas();
	initEventListeners();
	ctx.strokeStyle = "red";
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(10,10,2,2*Math.PI,false);
	ctx.fill();
	setInterval(update, 25);
}

var initGUI = function() {
	gui = new dat.GUI({height : 5*32-1});
	params = {
		Links : 3
	};
	gui.add(params, 'Links');
}

var initCanvas = function() {
	ctx = document.getElementById("canvas").getContext('2d');
	ctx.scale(1,-1);
	ctx.translate(window.innerHeight/2,-window.innerWidth/2);
	
}

var initEventListeners = function() {
	document.getElementById("canvas").addEventListener("click",getClickPosition);
}

var getClickPosition = function(e) {
    var parentPosition = getPosition(e.currentTarget);
    mouseClick_x = e.clientX - parentPosition.x - window.innerWidth/2;
    mouseClick_y = -1 * (e.clientY - parentPosition.y - window.innerHeight/2);
}

var getPosition = function(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

var canvasClear = function(ctx){
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}
update = function() {
	var pos_target = M(2,[
		mouseClick_x,
		mouseClick_y
	]);
	
	var lengths = [50,50,50,0];
	
	var Q = M(4, [
		currentAngles[0],
		currentAngles[1],
		currentAngles[2],
		currentAngles[3]
	])
	
	var Px, Py = 0;
	for(var i = 0; i < Q.rows; i++)
	{
		angSum = 0;
		for(var j = 0; j < i+1; j++)
			angSum += Q.get(j,0);
		Px += lengths[i]*Math.cos(angSum);
		Py += lengths[i]*Math.sin(angSum);
	}
	
	var pos_current = M(2,[
		Px,
		Py
	]);
	
	canvasClear(ctx);
	
	ctx.strokeStyle = "red";
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(10,10,200,2*Math.PI,false);
	ctx.fill();
	
	ctx.fillRect(-canvas.height/2,-canvas.width/2,canvas.heigth,canvas.width);
}