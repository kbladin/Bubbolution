//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;

	this.initGridData();

	this.numUpdates = 0;

	this.ants = [];
	this.antColonies = [];

	this.antColonies.push(new AntColony(this, this.width/2, this.height/2, 200));
	//this.antColonies.push(new AntColony(this, 3*width/4, height/2, 200));

};

World.prototype.initGridData = function() {
	//Convencience vars
	var cx = this.width/2;
	var cy = this.height/2;
	var w = this.width;
	var h = this.height;


	// Create ref to this in current scope for passing to closures
	var thisWorld = this;

	this.food = Utils.createGrid(w, h, function (i,j){
		//if (Utils.insideRect(i, j, cx - 50, cy + 50, 5, 5) ||
		//	Utils.insideRect(i, j, cx + 50, cy + 50, 5, 5)) {
		if(Utils.insideRect(i, j, cx, cy + 50, w, 2)){
			return 10;
		}
		return 0;
	});
};

World.prototype.entranceToAnthillAt = function(x, y) {
	for(var i = 0; i<this.antColonies.length; ++i){
		var anthill = this.antColonies[i];
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

