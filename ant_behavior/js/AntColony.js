//
// AntColony
//

function AntColony (world, x, y, numAnts) {
	this.world = world;
	var w = world.width;
	var h = world.height;
	this.capacity = this.STATIC.START_CAPACITY;

	for (var i = 0; i < numAnts; i++) {
		world.ants.push(new Ant(world, this, x, y, 0));
	}

	this.food = 0;
	this.buildMaterial = 0;

	this.homePheromones = Utils.createGrid(w, h, 0);
	this.exitPheromones = Utils.createGrid(w, h, 0);
	this.foodPheromones = Utils.createGrid(w, h, 0);

	this.nest = Utils.createGrid(w, h, function (i,j) {
		return Utils.insideRect(i, j, x, y, 1, 3) ? 1 : 0;
	});

	this.x = x;
	this.y = y;
};

AntColony.prototype.STATIC = {
	START_CAPACITY: 20,
}

AntColony.prototype.isEntrance = function(x, y) {
	return this.x === x && this.y === y;
};
