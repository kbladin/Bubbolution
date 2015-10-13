//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;

	this.initGridData();

	this.numUpdates = 0;

	this.ants = [];
	this.enemies = [];
	this.antColonies = [];
	this.foodSpawners = [];

	var smallBurstSpawner = {
		width: 5,
		height: 5,
		spawnTime: 1000,
		foodAmount: 100,
		burst: 5,
	};
	//this.foodSpawners.push(new FoodSpawner(this, 6, 6, smallBurstSpawner));
	//this.foodSpawners.push(new FoodSpawner(this, width-6, 6, smallBurstSpawner));

	var fastOmniSpawner = {
		width: width,
		height: height,
		spawnTime: 1,
		foodAmount: 10,
		burst: 1,
	};
	this.foodSpawners.push(new FoodSpawner(this, width/2, height/2, fastOmniSpawner));	


	//this.antColonies.push(new AntColony(this, 1*width/4, height/2, 20));
	//this.antColonies.push(new AntColony(this, 3*width/4, height/2, 20));

	this.antColonies.push(new AntColony(this, width/2, height/2, 150));
	//this.antColonies.push(new AntColony(this, 3*width/4, height/2, 200));


	//enemyParams = {
	//	radius: 10,
	//	antKillChance: 0.9,
	//	attackCoolDown: 5,
	//	walkCoolDown: 50,
	//	hp: 1000,
	//};
	//var enemy = new Enemy(this, 2, 2, enemyParams);
	//this.enemies.push(enemy)
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
		return 0;
		if(Utils.insideRect(i, j, cx, cy + 20, 15, 15)){
			return 10;
		}
		if(Utils.insideRect(i, j, 5, 5, 5, 5)){
			return 10;
		}
		if(Utils.insideRect(i, j, 35, 35, 5, 5)){
			return 10;
		}
		if(Utils.insideRect(i, j, w-10, 10, 5, 5)){
			return 0;
		}
		if(Math.random() > 0.999){
			return 1;
		}
		return 0;
	});
};

World.prototype.entranceToAnthillAt = function(x, y) {
	for(var i = 0; i<this.antColonies.length; ++i){
		if(this.antColonies[i].hasEntranceAt(x, y)){
			return this.antColonies[i];
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

