var antCount = 0;

function Ant (world, x, y, angle) {
	this.world = world;

	//Brain
	this.brain = new Brain(this);
	
    // Position and orientation
    this.x = x;
    this.y = y;
    this.angle = angle; // 0-7

    // Pheromones
    this.foodPheromone = 0;
    this.homePheromone = 1;

    // Determines behavior
    this.carryingFood = false;
    this.carryingBuildMaterial = false;
};

Ant.prototype.AVAILABLE_ACTIONS = ["lookForFood", "lookForHome"];

// STATIC CONSTANTS
Ant.prototype.constants = {

};

Ant.prototype.act = function() {
	var actionName = this.brain.getAction();
	this[actionName].call(this);
	this.update();
};

Ant.prototype.update = function() {

	// Check if food is found
	if (!this.carryingBuildMaterial && !this.carryingFood && this.world.food[this.x][this.y] > 0){
		this.world.food[this.x][this.y]--;
		this.carryingFood = true;
		this.foodPheromone = 1;
	}
	// Check if build material is found
	if (!this.carryingBuildMaterial && this.world.buildMaterial[this.x][this.y] > 0){
		this.world.buildMaterial[this.x][this.y]--;
		this.carryingBuildMaterial = true;
	}
	// Check if nest is found
	if (this.carryingBuildMaterial && this.isReachable(this.world.nest)) {
		this.carryingBuildMaterial = false;
		this.world.nest[this.x][this.y]++;
	}
	// Check if home is found
	if (world.entrances[this.x][this.y]) {
		this.carryingFood = false;
		this.carryingBuildMaterial = false;
		this.homePheromone = 1;
	}

	// Spread pheromones
	world.homePheromones[this.x][this.y] = Math.max(world.homePheromones[this.x][this.y], this.homePheromone);
	world.foodPheromones[this.x][this.y] = Math.max(world.foodPheromones[this.x][this.y], this.foodPheromone);

	// Loose pheromones
	this.homePheromone -= 0.01;
	this.foodPheromone -= 0.01;

};

//
// BASIC ACTIONS
//

Ant.prototype.walk = function() {
	switch(this.angle) {
	    case 0:
	        this.x++;
	        break;
	    case 1:
	        this.x++;
	        this.y++;
	        break;
	    case 2:
	        this.y++;
	        break;
	    case 3:
	        this.x--;
	        this.y++;
	        break;
	    case 4:
	        this.x--;
	        break;
	    case 5:
	        this.x--;
	        this.y--;
	        break;
	    case 6:
	        this.y--;
	        break;
	    case 7:
	        this.x++;
	        this.y--;
	        break;
	    default:
	        break;
	}

	if(this.x < 2)
		this.x = 2;
	if(this.x > this.world.width - 2)
		this.x = this.world.width - 2;
	if(this.y < 2)
		this.y = 2;
	if(this.y > this.world.height - 2)
		this.y = this.world.height - 2;
	return;
};

Ant.prototype.idle = function(){
	return;
}

Ant.prototype.turnLeft = function() {
	this.angle--;
	if (this.angle < 0)
		this.angle = 7;
	return;
};

Ant.prototype.turnRight = function() {
	this.angle++;
	if (this.angle > 7)
		this.angle = 0;
	return;
};

Ant.prototype.averagePheromoneLocally = function(pheromoneMap) {
	var pheromone = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			pheromone += pheromoneMap[this.x + i][this.y + j];
		};
	};
	pheromone /= 9;
	pheromoneMap[this.x][this.y] = pheromone;
}

Ant.prototype.isReachable = function(map) {
	var numReachable = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (map[this.x + i][this.y + j])
				numReachable++;
		};
	};
	if (numReachable >= 3)
		return true;
	else
		return false;
}

Ant.prototype.GetDirectionToHighestPheromone = function(pheromoneMap) {
	var pheromoneDirection = -1;
	var maxPheromoneValue = 0;

	if (pheromoneMap[this.x + 1][this.y] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x + 1][this.y];
		pheromoneDirection = 0;
	};
	if (pheromoneMap[this.x + 1][this.y + 1] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x + 1][this.y + 1];
		pheromoneDirection = 1;
	};
	if (pheromoneMap[this.x][this.y + 1] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x][this.y + 1];
		pheromoneDirection = 2;
	};
	if (pheromoneMap[this.x - 1][this.y + 1] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x - 1][this.y + 1];
		pheromoneDirection = 3;
	};
	if (pheromoneMap[this.x - 1][this.y] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x - 1][this.y];
		pheromoneDirection = 4;
	};
	if (pheromoneMap[this.x - 1][this.y - 1] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x - 1][this.y - 1];
		pheromoneDirection = 5;
	};
	if (pheromoneMap[this.x][this.y - 1] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x][this.y - 1];
		pheromoneDirection = 6;
	};
	if (pheromoneMap[this.x + 1][this.y - 1] > maxPheromoneValue) {
		maxPheromoneValue = pheromoneMap[this.x + 1][this.y - 1];
		pheromoneDirection = 7;
	};
	return pheromoneDirection;
}

//
// HIGH LEVEL ACTIONS
//

Ant.prototype.wander = function() {
	var r = Math.random();
	if (r < 0.33) {
		this.turnLeft();
	}
	else if (0.67 > r) {
		this.turnRight();
	}
	this.walk();
}

Ant.prototype.lookForHome = function() {
	// Find the way
	var pheromoneDirectionToHome = this.GetDirectionToHighestPheromone(world.homePheromones)

	var random = Math.random();
	if (pheromoneDirectionToHome != -1 && random > 0.1) {
		this.angle = pheromoneDirectionToHome;
		this.walk();
	}
	else
		this.wander();
}

Ant.prototype.lookForFood = function() {
	// Find the way
	var pheromoneDirectionToFood = this.GetDirectionToHighestPheromone(world.foodPheromones)

	var random = Math.random();
	if (pheromoneDirectionToFood != -1 && random > 0.1) {
		this.angle = pheromoneDirectionToFood;
		this.walk();
	}
	else
		this.wander();
}