/*
	PIXI
	Pour tout les exercices suivants utiliser des formes simples
*/

/*
	# Exercice : SHMUP

	* réaliser un shoot them up à partir des images données
	* aide toi de MathUtil.js pour faire tes calcules
*/

var isActive = true;

window.onfocus = function () { 
	console.log("focus");
  isActive = true; 
}; 

window.onblur = function () { 
	console.log("blur");
  isActive = false; 
}; 

var stageWidth = window.innerWidth;
var stageHeight = window.innerHeight;

var points = 0;

var renderer = new PIXI.autoDetectRenderer(stageWidth,stageHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var planet;
var foreground;

var deepSpace = new PIXI.Sprite.fromImage('images/background.jpg');
var texture2 = new PIXI.Texture.fromImage('images/background_2.png');

var texture3 = new PIXI.Texture.fromImage('images/background_3.png');

var textureS = PIXI.Texture.fromImage('images/bonusS.png');
var textureAS = PIXI.Texture.fromImage('images/bonusAS.png');

var style = {
	    font : '30px Audiowide',
	    fill : '#FCF6DF',
	    stroke : '#5D72DD',
	    strokeThickness : 3,
	    dropShadow : true,
	};	


/*
		UI
*/
var richText = new PIXI.Text('Points : ' + 0 + 'pts',style);
richText.anchor.set(1,0);

richText.x = stageWidth - 25 ;
richText.y = 0 + 25;

var bonusType = ['S','AS','P'];
var hearts = [];
	
PIXI.loader
    .add('images/explode.json')
    .load(onAssetsLoaded);

var explosionFrame = [];

var perso ;
var enemies = [];
var bonusArray =[];

function addEnemy () {
	if (isActive) {
		for(var i = 0, max = MathUtil.rndIntRange(1,5); i < max; i++){
			var ennemi = new Enemy();
			ennemi.create(stage);
			enemies.push(ennemi);
		}
	}
	
	setTimeout(addEnemy,MathUtil.rndRange(1000,2500),isActive);	
}




var animation = function() {
	moveParalax();
	perso.move();
	perso.shoot();
	var dead = perso.hit();
	
	for(var i = 0; i < perso.bullets.length; i++){
		var hitting = perso.bullets[i].hit();
		if (!hitting) {
			perso.bullets[i].move();
		};
		
	}
	for(var j = 0; j < enemies.length; j++){
		enemies[j].move();
	}

	for(var k = 0; k < bonusArray.length; k++){
		bonusArray[k].move();
	}

	if(perso.life <=0) {
		gameOver(points);
	} else {
		showPoints(points);
	}

	renderer.render(stage);

	requestAnimationFrame(animation);
}


function onAssetsLoaded()
{
	planet = new PIXI.extras.TilingSprite(texture2, stageWidth, stageHeight);
	foreground = new PIXI.extras.TilingSprite(texture3, stageWidth, stageHeight);
	deepSpace.width = stageWidth;
	deepSpace.height = stageHeight;
	planet.tileScale.x = stageHeight/texture2.height;
	foreground.tileScale.x = stageHeight/texture3.height;
	planet.tileScale.y = stageHeight/texture2.height;
	foreground.tileScale.y = stageHeight/texture3.height;
	stage.addChild(deepSpace);
	stage.addChild(planet);
	stage.addChild(foreground);

	addEnemy();

	bonus();

	perso = new Character();
	perso.create(stage, stageWidth/2, stageHeight/2);


	initialiseHearth(perso.life);
	stage.addChild(richText);

    for (var i = 0; i < 6; i++) {

        // magically works since the spritesheet was loaded with the pixi loader
        explosionFrame.push(PIXI.Texture.fromFrame('Explode ' + i ));

        requestAnimationFrame(animation);
    }
}

function launchExplosion(position){
	var explosion = new PIXI.extras.MovieClip(explosionFrame);
	explosion.anchor.set(0.5,0.5);
	explosion.position = position;
    explosion.animationSpeed = 0.5;
    explosion.loop = false;

    explosion.play();
    stage.addChild(explosion);

    setTimeout(function() {
    	var indexContainer = stage.getChildIndex(explosion);
		stage.removeChildAt(indexContainer);
    }, 750)
    
}

function moveParalax() {
	planet.tilePosition.x -= 0.05;
	foreground.tilePosition.x -= 0.25;
}

function showPoints(int) {
	richText.text = 'Points : ' + int + 'pts';
}
function gameOver(int) {
	richText.text = 'Game Over : ' + int + 'pts';
}

function initialiseHearth(int) {
	for(var i = 0; i < int; i++){
		hearts.push(new PIXI.Sprite.fromImage('images/hearth.png'));
		hearts[i].position.set(i*70 + 25,25);
		stage.addChild(hearts[i]);
	}
}
function bonus() {
	if (isActive) {
		var b = new Bonus();
		b.create(stage, bonusType[MathUtil.rndIntRange(0,bonusType.length)]);
		bonusArray.push(b);
	}
	
	setTimeout(bonus, MathUtil.rndIntRange(15000,90000));
}