var Character = function() {
	var _self = this;

	_self.bol = false;
	_self.normalSprite = PIXI.Texture.fromImage('images/space_ship.png');
	_self.hittedSprite = PIXI.Texture.fromImage('images/space_ship_hit.png');
	_self.destroyedSprite = PIXI.Texture.fromImage('images/space_ship_destroyed.png');

	_self.height = 38;
	_self.width = 80;
	_self.bullets = [];
	_self.canShoot = true;
	_self.defaultSpeed = 1;
	_self.defaultShootPerSec = 3;
	_self.speed = _self.defaultSpeed;
	_self.shootPerSec = _self.defaultShootPerSec;
	_self.life = 5;
}

Character.prototype.create = function(stage,x,y){
	var _self = this;

	_self.ship = new PIXI.Sprite(_self.normalSprite);
	_self.ship.height = _self.height;
	_self.ship.width = _self.width;
	_self.ship.anchor = new PIXI.Point(0.5,0.5);

	
	_self.container = new PIXI.Container();
	_self.container.position.x = x;
	_self.container.position.y = y;
	_self.container.addChild(_self.ship);

	stage.addChild(_self.container);
};
Character.prototype.move = function() {
	var _self = this;
	
	if ( up &&  _self.container.position.y > 0 + _self.height/2) {
		//console.log("u");
		//console.log(_self.container);
		_self.container.position.y -= _self.speed;
	}
	if (down &&  _self.container.position.y < stageHeight - _self.height/2 ) {
		//console.log('d');
		_self.container.position.y += _self.speed;
	}
	if (left &&  _self.container.position.x > 0 + _self.width/2) {
		_self.container.position.x -= _self.speed;
	}
	if (right &&  _self.container.position.x < stageWidth - _self.width/2 ) {
		_self.container.position.x += _self.speed;
	}
}
Character.prototype.hit = function() {
	var _self = this;
	for(var k = 0; k < enemies.length; k++){
		var ennemy = enemies[k];
		var hitting = MathUtil.hitTest(_self.container.position.x,
						_self.container.position.y,
						_self.width,
						_self.height,
						ennemy.container.position.x,
						ennemy.container.position.y,
						ennemy.width,
						ennemy.height
		);
		if (hitting) {
			console.log("ship hitted");
			ennemy.destroy();
			_self.life -- ;
			_self.loseHearth();
			if (_self.life == 0) {
				_self.destroy();
				return true;
			}
			_self.ship.texture = _self.hittedSprite;
			setTimeout(function() {
				_self.ship.texture = _self.normalSprite;
			}, 350)
			return false;
		}		
	}
	return false;
} 
Character.prototype.shoot = function(){
	var _self = this;

	if (space && _self.canShoot) {
		_self.canShoot = false;
		setTimeout(function () {
			_self.canShoot = true;
		},1000/_self.shootPerSec);
		var bullet = new Bullet();
		bullet.create(stage,_self,_self.container.position.x,_self.container.position.y);

		_self.bullets.push(bullet);  
	}

	 
};
Character.prototype.destroy = function(){
	var _self = this;
	_self.ship.texture = _self.destroyedSprite;
	launchExplosion(_self.container.position);
	var indexContainer = stage.getChildIndex(_self.container);
	stage.removeChildAt(indexContainer);
	console.log('YOU DIE');
};
Character.prototype.loseHearth = function () {
	var _self = this;
	var indexContainer = stage.getChildIndex(hearts[_self.life]);
	stage.removeChildAt(indexContainer); 
}