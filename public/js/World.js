//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;
	this.numUpdates = 0;
	this.numBornAgents = 0;
	this.numDeadAgents = 0;

	gameobjectObservers = [];

	this.agents = [];
	this.foods = [];
	this.foodSpawners = [];
};

World.prototype.getAgentsWithinRadius = function(gameObject, radius, sorted) {
	return this.getGameObjectsWithinRadius(this.agents, gameObject, radius, sorted);
};

World.prototype.getFoodsWithinRadius = function(gameObject, radius, sorted) {
	return this.getGameObjectsWithinRadius(this.foods, gameObject, radius, sorted);
};

World.prototype.getFoodSpawnersWithinRadius = function(gameObject, radius, sorted) {
	return this.getGameObjectsWithinRadius(this.foodSpawners, gameObject, radius, sorted);
};

World.prototype.getGameObjectsWithinRadius = function(array, gameObject, radius, sorted){
	var nearByGameObjects = [];
	var r2 = radius * radius;
	var x = gameObject.x;
	var y = gameObject.y;

	array.forEach(function(o){
		if(gameObject.id === o.id){
			return;
		}

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
			return o1.dist2 - o2.dist2;
		});
	}

	return nearByGameObjects;
}


World.prototype.removeFoodSpawners = function (foodSpawners){
	return this.removeGameObject(this.foodSpawners, foodSpawners);
}

World.prototype.removeAgent = function (agent){
	return this.removeGameObject(this.agents, agent);
}

World.prototype.removeFood = function (food) {
	return this.removeGameObject(this.foods, food);
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

World.prototype.clampPosition = function(x, y, padding) {
	return {
		x: Math.max(Math.min(world.width -padding, x), padding),
		y: Math.max(Math.min(world.height-padding, y), padding),
	};
};
