var Enemy = function() {
	var _self = this;
	_self.height = 20;
	_self.width = 30;
	_self.speed = MathUtil.rndRange(0.25,1);
}

Enemy.prototype.create = function(stage,x,y){
	var _self = this;

	_self.ship = PIXI.Sprite.fromImage('images/enemy.png');
	_self.ship.height = _self.height;
	_self.ship.width = _self.width;
	_self.ship.anchor = new PIXI.Point(0.5,0.5);

	_self.container = new PIXI.Container();
	_self.container.position.x = stageWidth - _self.width/2 ;
	_self.container.position.y = (MathUtil.rndRange(0,stageHeight) - _self.height/2) - 100 ;
	_self.container.addChild(_self.ship);

	stage.addChild(_self.container);
};
Enemy.prototype.move = function() {
	var _self = this;
	_self.container.position.x -= _self.speed;
	
	if (_self.container.position.x < 0 - _self.width/2) {
		_self.destroy(true);
	}
} 
Enemy.prototype.destroy = function(noAnimation){
	var _self = this;

	if (!noAnimation) {
		var explosion = launchExplosion(_self.container.position);
		points ++;
	}

	var index = enemies.indexOf(_self);
	if (index > -1) { enemies.splice(index, 1);}

	var indexContainer = stage.getChildIndex(_self.container);
	stage.removeChildAt(indexContainer);
};