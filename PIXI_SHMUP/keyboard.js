var up = false;
var down = false;
var left = false;
var right = false;
var space = false;


var dirDown = function(e) {
	var keyInput = e.which;
	switch(keyInput) {
		case 38:
			up = true;
			break;
		case 40:
			down = true;
			break;
		case 37:
			left = true;
			break;
		case 39:
			right = true;
			break;
		case 32:
			space = true;
			break;
	}
}
var dirUp = function(e) {
	var keyInput = e.which;
	switch(keyInput) {
		case 38:
			up = false;
			break;
		case 40:
			down = false;
			break;
		case 37:
			left = false;
			break;
		case 39:
			right = false;
			break;
		case 32:
			space = false;
			break;
	}
}

window.addEventListener("keydown", dirDown);
window.addEventListener("keyup", dirUp);
