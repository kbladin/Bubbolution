//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;

	this.initGridData();

	this.numUpdates = 0;	
	this.ants = [];
};

World.prototype.initGridData = function() {
	//Convencience vars for center of world
	var cx = this.width/2;
	var cy = this.height/2;

	// Create ref to this in current scope for passing to closures
	var thisWorld = this;

	this.homePheromones = this.createGrid(0);
	this.foodPheromones = this.createGrid(0);
	this.food = this.createGrid(function (i,j){
		if (thisWorld.insideRect(i, j, cx - 50, cy + 50, 5, 5) ||
			thisWorld.insideRect(i, j, cx + 50, cy + 50, 5, 5)) {
			return 50;
		} 
		return 0;
	});
	this.nest = this.createGrid(function (i,j) {
		return thisWorld.insideRect(i, j, cx, cy, 6, 6) ? 1 : 0;
	});
	this.buildMaterial = this.createGrid(function () {
		return Math.random() > 0.9 ? 1 : 0;
	});
	this.entrances = this.createGrid(0);
	this.entrances[cx][cy] = 1;
};

World.prototype.createGrid = function (value) {
	var grid = new Array(this.width);
	for (var i = 0; i < this.width; i++) {
		grid[i] = new Array(this.height);
		for (var j = 0; j < this.height; j++) {
			grid[i][j] = typeof value === 'function' ? value(i, j) : value;
		}
	}
	return grid;
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

// x: x-position to test
// y: y-position to test
// cx: x-position of center of rectangle 
// cy: y-position of center of rectangle
// w: width of rectangle   
// h: height of rectangle 
World.prototype.insideRect = function(x, y, cx, cy, w, h) {
	return (Math.abs(x - cx) <= w / 2) && (Math.abs(y - cy) <= h / 2);
};
