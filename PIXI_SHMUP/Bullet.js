var Bullet = function() {
	var _self = this;
	_self.height = 18;
	_self.width = 34;
	_self.speed = 5;
}
Bullet.prototype.create = function(stage,perso,x,y){
	var _self = this;
	_self.owner = perso;

	_self.circle = PIXI.Sprite.fromImage('images/bullet.png');
	_self.circle.height = _self.height;
	_self.circle.width = _self.width;
	_self.circle.anchor = new PIXI.Point(0.5,0.5);

	_self.container = new PIXI.Container();
	_self.container.position.x = x;
	_self.container.position.y = y;
	_self.container.addChild(_self.circle);

	stage.addChild(_self.container);
};
Bullet.prototype.move = function() {
	var _self = this;
	_self.container.position.x += _self.speed;
	
	if (_self.container.position.x > stageWidth) {
		_self.destroy();
	}

}
Bullet.prototype.hit = function() {
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
			console.log("hit");
			ennemy.destroy();
			_self.destroy();
			return true;
		}
		
	}
	return false;
} 
Bullet.prototype.destroy = function(){
	var _self = this;

	var index = _self.owner.bullets.indexOf(_self);
	if (index > -1) { _self.owner.bullets.splice(index, 1);}

	var indexContainer = stage.getChildIndex(_self.container);
	stage.removeChildAt(indexContainer);
	console.dir(stage.children);
};