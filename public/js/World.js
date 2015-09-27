//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;

	this.agents = [];
	this.foods = [];
	this.foodSpawners = [];
};

World.prototype.getAgentsWithinRadius = function(x, y, radius, sorted) {
	return this.getGameObjectsWithinRadius(this.agents, x, y, radius, sorted);
};

World.prototype.getFoodsWithinRadius = function(x, y, radius, sorted) {
	return this.getGameObjectsWithinRadius(this.foods, x, y, radius, sorted);
};

World.prototype.getFoodSpawnersWithinRadius = function(x, y, radius, sorted) {
	return this.getGameObjectsWithinRadius(this.foodSpawners, x, y, radius, sorted);
};

World.prototype.getGameObjectsWithinRadius = function(array, x, y, radius, sorted){
	var nearByGameObjects = [];
	var r2 = radius * radius;

	array.forEach(function(o){
		var dist2 = (o.x-x)*(o.x-x) + (o.y-y)*(o.y-y);
		if(dist2 < r2){
			nearByGameObjects.push({
				object: o,
				dist2: dist2
			});
		}
	});

	if(sorted){
		nearByGameObjects.sort(function (o1,o2){
			return o1.dist2 > o2.dist2;
		});
	}

	return nearByGameObjects;
}



