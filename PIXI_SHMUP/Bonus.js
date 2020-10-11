var Bonus = function() {
	var _self = this;
	/*
		S : Speed
		AS : Attack Speed
		P : Points
	*/
	_self.type ;
	_self.radius = 0;
	_self.timer = MathUtil.rndIntRange(5000,1500);
	
	
}
Bonus.prototype.create = function(stage,type){
	var _self = this;
	_self.type = type;

	_self.circle = new PIXI.Sprite;
	
	switch(_self.type) {
		case 'S':
			_self.circle.texture = textureS;
			break;
		case 'AS':
			_self.circle.texture = textureAS;
			break;
		case 'P':
			_self.circle = new PIXI.Graphics();
			_self.circle.lineStyle(0);
			_self.circle.beginFill(0xFFFF0B, 1);
			_self.circle.drawCircle(0, 0,_self.radius);
			_self.circle.endFill();
			break;
	}

	_self.container = new PIXI.Container();
	_self.container.position.x = 400;
	_self.container.position.y = 400;
	_self.container.addChild(_self.circle);

	stage.addChild(_self.container);
};
