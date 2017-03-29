/**********************************
			Utilities
***********************************/

/*
	var obj = {
		currentStep: 
		maxStep: 
		center: 
		lineWidth: 
		radius:
		text: 
		strokeStyle: 
	}
*/
function drawCircle(ctx, obj) {
	var step = (Math.PI*2) / obj.maxStep;
	var radius = obj.radius;
	var startAngle = -Math.PI/2;
	// Explication: - obj.maxStep/4 =>  reculer 1/4 de cercle
	var endAngle = (obj.currentStep - obj.maxStep/4 ) * step;

	//circle
    ctx.beginPath();
    ctx.arc(center.x, center.y, obj.radius, startAngle, endAngle, false);
    ctx.lineWidth = obj.lineWidth;
    ctx.strokeStyle = obj.strokeStyle || 'black';
    ctx.stroke();

    //Graduation
    ctx.strokeStyle = 'white';
    ctx.globalAlpha = 0.35;
	ctx.lineWidth = 3;

	for (var angle = startAngle; angle < endAngle; angle += step ) {
		var P1 = coordOfPointOnCircle(obj.center.x,obj.center.y,obj.radius+(obj.lineWidth/2),angle);
		var P2 = coordOfPointOnCircle(obj.center.x,obj.center.y,obj.radius-(obj.lineWidth/2),angle);
		drawGraduation(ctx, P1,P2);
	};

	ctx.globalAlpha = 1;

		//text
	ctx.font = '30px Arial';
	ctx.fillStyle = obj.strokeStyle;
	ctx.strokeStyle = 'black';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'end';
	ctx.lineWidth = 1;
	ctx.fillText(obj.text, obj.center.x , obj.center.y - ( obj.radius ) );
	ctx.strokeText(obj.text, obj.center.x , obj.center.y - ( obj.radius ) );

}
/*
	month: 1-12
*/
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

/*
	x = x0 + r*cos(t)
 	y = y0 + r*sin(t)
*/
function coordOfPointOnCircle (centerX, centerY, radius, angle) {
	x = centerX + radius * Math.cos(angle);
	y = centerY + radius * Math.sin(angle);
	return {
		x: x, 
		y: y
	};
}

function drawGraduation (ctx, P1, P2) {
	
	ctx.beginPath();
	ctx.moveTo(P1.x,P1.y);
	ctx.lineTo(P2.x,P2.y);
	ctx.stroke();
}

/************************************
			Main Program
*************************************/
var canvas = document.getElementById("monCanvas");
canvas.height = 900;
canvas.width = 1200;
//canvas.height = 450;
//canvas.width = 600;
canvas.style.border = "solid 1px black";

var center = { x: canvas.width / 2, y : canvas.height / 2 }
var offSet = 75;
var maxRadius;
if (canvas.width > canvas.height) {
	maxRadius = canvas.height/2 - offSet;
} else {
	maxRadius = canvas.width/2 - offSet;
}

window.addEventListener("DOMContentLoaded", function() {
	ready();
});

function ready() {
	var context = canvas.getContext('2d');	

	var repeater = setInterval(clock, 1000);

	function clock() {
		context.clearRect(0, 0, monCanvas.width, monCanvas.height);

		var lineWidth = 30;
		var margin = 10;

		// TODO : Boucle For

    	drawCircle(context,{
    		currentStep: new Date().getSeconds(),
			maxStep: 60,
			center: center,
			lineWidth: lineWidth,
			radius: maxRadius,
			text: 'S ',
			strokeStyle: "green"
    	});

    	drawCircle(context,{
    		currentStep: new Date().getMinutes(),
			maxStep: 60,
			center: center,
			lineWidth: lineWidth,
			radius: maxRadius - (lineWidth + margin),
			text: 'M ',
			strokeStyle: "red"
    	});

    	drawCircle(context,{
    		currentStep: new Date().getHours(),
			maxStep: 24,
			center: center,
			lineWidth: lineWidth,
			radius: maxRadius - 2*(lineWidth + margin),
			text: 'H ',
			strokeStyle: "purple"
    	});

    	var month = new Date().getMonth()+1;

    	drawCircle(context,{
    		currentStep: new Date().getDate(),
			maxStep: daysInMonth( month, new Date().getFullYear() ),
			center: center,
			lineWidth: lineWidth,
			radius: maxRadius - 3*(lineWidth + margin),
			text: 'D ',
			strokeStyle: "#F2DF19"
    	});

    	drawCircle(context,{
    		currentStep: month,
			maxStep: 12,
			center: center,
			lineWidth: lineWidth,
			radius: maxRadius - 4*(lineWidth + margin),
			text: 'M ',
			strokeStyle: "lightblue"
    	});

    	var day = new Date().getDay();
    	if (day == 0) {
    		day = 7;
    	}
    	drawCircle(context,{
    		currentStep: day,
			maxStep: 7,
			center: center,
			lineWidth: lineWidth,
			radius: maxRadius - 5*(lineWidth + margin),
			text: 'J ',
			strokeStyle: "#5EDC88"
    	});
    	
	}

};
