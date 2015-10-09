//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;

	this.initGridData();

	this.numUpdates = 0;

	this.ants = [];
	this.anthills = [];

	this.anthills.push(new Anthill(this, 1*width/4, height/2, 100));
	this.anthills.push(new Anthill(this, 3*width/4, height/2, 100));

};

World.prototype.initGridData = function() {
	//Convencience vars
	var cx = this.width/2;
	var cy = this.height/2;
	var w = this.width;
	var h = this.height;


	// Create ref to this in current scope for passing to closures
	var thisWorld = this;

	this.homePheromones = Utils.createGrid(w, h, 0);
	this.foodPheromones = Utils.createGrid(w, h, 0);
	this.food = Utils.createGrid(w, h, function (i,j){
		if (Utils.insideRect(i, j, cx - 50, cy + 50, 5, 5) ||
			Utils.insideRect(i, j, cx + 50, cy + 50, 5, 5)) {
			return 50;
		}
		return 0;
	});
	this.buildMaterial = Utils.createGrid(w, h, function () {
		return Math.random() > 0.9 ? 1 : 0;
	});
};

World.prototype.entranceToAnthillAt = function(x, y) {
	for(var i = 0; i<this.anthills.length; ++i){
		var anthill = this.anthills[i];
		if(anthill.x === x && anthill.y === y){
			return anthill;
		}
	}
	return null;
};

World.prototype.forEachValInGrid = function(grid, callback) {
	for (var i = 0; i < this.width; i++) {
		for (var j = 0; j < this.height; j++) {
			callback(grid[i][j]);
		}
	}
};

World.prototype.sumGridValues = function(grid) {
	var sum = 0
	this.forEachValInGrid(grid, function (val) {
		sum += val;
	});
	return sum;
};

