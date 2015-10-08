//
// World
//

function World (width, height) {
	this.width = width;
	this.height = height;
	this.numUpdates = 0;

	this.homePheromones = new Array(width);
	this.foodPheromones = new Array(width);

	this.food = new Array(width);
	this.nest = new Array(width);
	//this.buildMaterial = new Array(width);
	this.entrances = new Array(width);

	for (var i = 0; i < width; i++) {
	  this.homePheromones[i] = new Array(height);
	  this.foodPheromones[i] = new Array(height);

	  this.food[i] = new Array(height);
	  this.nest[i] = new Array(height);
	  //this.buildMaterial[i] = new Array(height);
	  this.entrances[i] = new Array(height);
	}
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			this.homePheromones[i][j] = 0;
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
		}
	}
	this.entrances[width/2][height/2] = 1;
	this.ants = [];
};