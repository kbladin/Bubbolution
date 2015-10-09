//
// Anthill
//

function Anthill (world, x, y, numAnts) {
	this.world = world;
	this.capacity = this.STATIC.START_CAPACITY;

	for (var i = 0; i < numAnts; i++) {
		world.ants.push(new Ant(world, this, x, y, 0));
	}

	this.food = 0;
	this.buildMaterial = 0;

	this.nest = Utils.createGrid(world.width, world.height, function (i,j) {
		return Utils.insideRect(i, j, x, y, 6, 6) ? 1 : 0;
	});

	this.x = x;
	this.y = y;
};

Anthill.prototype.STATIC = {
	START_CAPACITY: 20,
}

Anthill.prototype.isEntrance = function(x, y) {
	return this.x === x && this.y === y;
};
