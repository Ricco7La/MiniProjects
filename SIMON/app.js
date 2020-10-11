var ui_lifes = document.getElementById("lifes");
var ui_currentLevel = document.getElementById("current-level");
var ui_finalLevel = document.getElementById("final-level");

var greenSound = document.getElementById("sounds-1");
var redSound = document.getElementById("sounds-2");
var yellowSound = document.getElementById("sounds-3");
var blueSound = document.getElementById("sounds-4");
var sounds = [greenSound,redSound,yellowSound,blueSound];

var colors = document.getElementById("colors");
var greenButton = document.getElementById("color-green");
var redButton = document.getElementById("color-red");
var yellowButton = document.getElementById("color-yellow");
var blueButton = document.getElementById("color-blue");
var buttons = [greenButton, redButton, yellowButton, blueButton];
function cleanButtons() {
	for (key in buttons) {
		if (buttons[key].classList.contains("active")) {
			buttons[key].classList.remove("active");
		}
	}
}
function getNumber(id) {
	for (index in buttons) {
		if (buttons[index].id == id) {
			return index;
		}
	}
}

var homePage = document.getElementById("home");
var gamePage = document.getElementById("game");
var resultPage = document.getElementById("result");

var shortTimer = 300;
var middleTimer = 500;
var longTimer = 1000;
var timerBetweenTurn = 1500;

var soundEnabled = true;

var life = 3;

var simon = [];
var level = function() {
	return simon.length;
}
var simonIsPlaying = true;

var playerRecord= [];

var simonCounter = 0;
var playerCounter = 0;

var play = function() {
	document.getElementById("soundOFF").style.display = "none";
	
	homePage.classList.toggle("active");
	gamePage.classList.toggle("active");

	setTimeout(nextTurn, timerBetweenTurn);
}
var gameOver = function() {
	gamePage.classList.toggle("active");
	resultPage.classList.toggle("active");

	ui_finalLevel.innerText = level();
}
var playAgain = function() {
	life = 3;
	ui_lifes.innerText = life;
	simon = [];
	ui_currentLevel.innerText = level();
	resultPage.classList.toggle("active");
	gamePage.classList.toggle("active");

	setTimeout(nextTurn, timerBetweenTurn);
}

var nextTurn = function() {
	counter = 0;
	playerCounter = 0;
	playerRecord= [];
	var random = Math.floor(Math.random()*buttons.length);
	simon.push(random);
	ui_currentLevel.innerText = level();
	console.log("Simon play");
	playSimon();
}
var replayTurn = function() {
	counter = 0;
	playerCounter = 0;
	playerRecord= [];
	console.log("Simon play");
	playSimon();
}

var playSimon = function() {
	if (counter == level() ) {
		return record();
	} else {
		console.log(simon[counter]);
		if (soundEnabled) {sounds[simon[counter]].play()};
		buttons[simon[counter]].classList.add("active");
		setTimeout(cleanButtons, middleTimer);
		counter++;
		setTimeout(playSimon, longTimer);
	}
}

var record = function() {
	console.log("record");
	simonIsPlaying = false;	
}

var toggleSound = function() {
	if (soundEnabled) {
		soundEnabled = false;
		document.getElementById("soundON").style.display = "none";
		document.getElementById("soundOFF").style.display = "inline";
	} else {
		soundEnabled = true;
		document.getElementById("soundON").style.display = "inline";
		document.getElementById("soundOFF").style.display = "none";
	}
}

var recordClick = function(e) {
		if (!simonIsPlaying) {
			var int = getNumber(e.target.id);
			if (soundEnabled) {sounds[int].play()};
			buttons[int].classList.add("active");
			setTimeout(cleanButtons, shortTimer);
			playerRecord.push(int);
			if (int == simon[playerCounter]) {
				playerCounter++;
				if (playerCounter == level()) {
					simonIsPlaying = true;
					setTimeout(nextTurn, timerBetweenTurn);
					return;
				}
			} else {
				console.log('Error (sound');
				life--;
				ui_lifes.innerText = life;
				if (life == 0) {
					simonIsPlaying = true;
					gameOver();
					return;
				} else {
					simonIsPlaying = true;
					setTimeout(0, timerBetweenTurn);
					return;
				}
			}
		}
	};



document.getElementById("play").addEventListener("click", play);
document.getElementById("replay").addEventListener("click", playAgain);
colors.addEventListener("click", recordClick, false );
document.getElementById("soundToggle").addEventListener("click", toggleSound)