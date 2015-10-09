//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;
/*
<<<<<<< HEAD
	this.homePheromones = new Array(width);
	this.exitPheromones = new Array(width);
	this.foodPheromones = new Array(width);

	this.food = new Array(width);
	this.nest = new Array(width);
	//this.buildMaterial = new Array(width);
	this.entrances = new Array(width);

	for (var i = 0; i < width; i++) {
	  this.homePheromones[i] = new Array(height);
	  this.exitPheromones[i] = new Array(height);
	  this.foodPheromones[i] = new Array(height);

	  this.food[i] = new Array(height);
	  this.nest[i] = new Array(height);
	  //this.buildMaterial[i] = new Array(height);
	  this.entrances[i] = new Array(height);
	}
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			this.homePheromones[i][j] = 0;
			this.exitPheromones[i][j] = 0;
			this.foodPheromones[i][j] = 0;
			this.food[i][j] = 0;
			this.nest[i][j] = 0;
			if (i > width/2 + 50 - 10 &&
				i < width/2 + 50 + 10 &&
				j > height/2 + 50 - 10 &&
				j < height/2 + 50 + 10)
				this.food[i][j] = 50;
			if (i > width/2 - 50 - 10 &&
				i < width/2 - 50 + 10 &&
				j > height/2 + 50 - 10 &&
				j < height/2 + 50 + 10)
				this.food[i][j] = 50;
			if (i > width/2 - 3 &&
				i < width/2 + 3 &&
				j > height/2 - 3 &&
				j < height/2 + 3)
				this.nest[i][j] = 1;

			//if (Math.random() > 0.8)
				//this.buildMaterial[i][j] = 1;
=======
*/
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
	this.exitPheromones = this.createGrid(0);
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
//>>>>>>> 50c97c4e6aff96ef3d91a349f289620475e9b0f3
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
