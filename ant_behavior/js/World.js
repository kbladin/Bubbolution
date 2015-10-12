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


	//this.antColonies.push(new AntColony(this, 1*width/4, height/2, 20));
	//this.antColonies.push(new AntColony(this, 3*width/4, height/2, 20));

	this.antColonies.push(new AntColony(this, width/2, height/2, 150));
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
		if(Utils.insideRect(i, j, cx, cy + 20, 15, 15)){
			return 100;
		}
		if(Utils.insideRect(i, j, 5, 5, 5, 5)){
			return 100;
		}
		if(Utils.insideRect(i, j, 35, 35, 5, 5)){
			return 100;
		}
		if(Utils.insideRect(i, j, w-10, 10, 5, 5)){
			return 1000;
		}
		if(Math.random() > 0.99){
			return 0;
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

World.prototype.removeAnt = function(ant) {
	for (var i = 0; i < this.ants.length; i++) {
		if(this.ants[i] === ant){
			return this.ants.splice(i, 1);
		}
	};
};

World.prototype.antsInColony = function(colony) {
	var sum = 0;
	for (var i = 0; i < this.ants.length; i++) {
		if(this.ants[i].antColony === colony){
			sum++;
		}
	};
	return sum;
};

