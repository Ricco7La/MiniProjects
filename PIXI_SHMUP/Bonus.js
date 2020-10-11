var Bonus = function() {
	var _self = this;
	/*
		S : Speed
		AS : Attack Speed
		P : Points
	*/
	_self.type ;
	_self.radius = 15; //15
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
	_self.container.position.x = stageWidth - _self.width/2 ;
	_self.container.position.y = (MathUtil.rndRange(0,stageHeight) - _self.height/2) - 100 ;
	_self.container.addChild(_self.circle);

	stage.addChild(_self.container);
};

Bonus.prototype.move = function() {
	var _self = this;
	_self.container.position.x -= 0.25;
	
	if (_self.container.position.x < 0 - _self.width/2) {
		_self.destroy();
	}
} 

Bonus.prototype.destroy = function(){
	var _self = this;

	
	var index = bonusArray.indexOf(_self);
	if (index > -1) { bonusArray.splice(index, 1);}

	var indexContainer = stage.getChildIndex(_self.container);
	stage.removeChildAt(indexContainer);
};
