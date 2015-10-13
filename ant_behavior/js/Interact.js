
document.onkeydown = function (e) {
	var enemy = world.enemies[0];
	switch(e.keyCode){
		case 37: return MoveLogic.turnLeft(enemy);
		case 38: return MoveLogic.walk(enemy);
		case 39: return MoveLogic.turnRight(enemy);
	}
}
