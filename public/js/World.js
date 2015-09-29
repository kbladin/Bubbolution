//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;

	gameobjectObservers = [];

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
				gameObject: o,
				dist2: dist2
			});
		}
	});

	if(sorted){
		nearByGameObjects.sort(function (o1, o2){
			return o1.dist2 > o2.dist2;
		});
	}

	return nearByGameObjects;
}



World.prototype.removeFoodSpawners = function (foodSpawners){
	return removeGameObject(this.foodSpawners, foodSpawners);
}

World.prototype.removeAgent = function (agent){
	return removeGameObject(this.agents, agent);
}

World.prototype.removeFood = function (food) {
	return removeGameObject(this.foods, food);
}

World.prototype.removeGameObject = function(array, gameObject){
	for(var i = 0; i<array.length; ++i){
		if(array[i].id === gameObject.id){
			array.splice(i,1);
			//nofify observers that gameobject was removed?
			return true;
		}
	}
	return false;
}

World.prototype.getRandomPosition = function(){
	return {
		x: this.width * Math.random(),
		y: this.height * Math.random()
	};
}
