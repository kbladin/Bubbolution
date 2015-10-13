var antCount = 0;

function Ant (world, antColony, x, y, angle) {
	this.world = world;
	this.antColony = antColony;

	//Brain
	this.brain = new Brain(this);

	this.hunger = 0;
	this.age = 0;
	
    // Position and orientation
    this.x = x;
    this.y = y;
    this.angle = angle; // 0-7

 	// Pheromones
    this.foodPheromone = 0;
    this.homePheromone = 0;
    this.exitPheromone = 0;

    // Timers
    this.homeSickTimer = 0;

    // Determines behavior
    this.carryingFood = false;
    this.carryingDirt = false;
    this.insideNest = false;
};

Ant.prototype.AVAILABLE_ACTIONS = ["lookForFood", "lookForHome", "lookForExit", "digNest", "buildAntHill"];

// STATIC CONSTANTS
Ant.prototype.STATIC = {
	FOOD_PHERMONE_DECREASE: 0.01,
	HOME_PHERMONE_DECREASE: 0.01,
	EXIT_PHERMONE_DECREASE: 0.01,

	FOOD_PHERMONE_DECREASE: 0.01,

	MAX_INSIDE_HOMESICKNESS: 50,
	MAX_OUTSIDE_HOMESICKNESS: 200,

	MAX_AGE: 150000,
	MAX_HUNGER: 2000,

	HUNGER_PER_FOOD: 1000,
};

Ant.prototype.act = function() {
	var actionName = this.brain.getAction();
	this[actionName].call(this);
	this.update();
};

Ant.prototype.update = function() {

	// Update hunger and age
	this.hunger++;
	this.age++;

	if(this.age > this.STATIC.MAX_AGE || this.hunger > this.STATIC.MAX_HUNGER){
		if(Math.random() > 0.999){
			return this.world.removeAnt(this);
		}
	}

	if (this.insideNest) {
		// Check if exit is found and inside
		if (this.world.entranceToAnthillAt(this.x,this.y) === this.antColony) {
			this.insideNest = false;
			this.homePheromone = 1;
			this.foodPheromone = 0;
			this.homeSickTimer = 0;
		}
	} 
	else {
		//Outside nest

		this.exitPheromone = 0;
		// Check if home is found and outside
		if (this.world.entranceToAnthillAt(this.x,this.y) === this.antColony) {
			this.insideNest = true;
			if(this.carryingFood){
				this.antColony.food++;
				this.carryingFood = false;
			}
			this.exitPheromone = 1;
			this.homeSickTimer = 0;
			this.foodPheromone = 0;
			if(this.antColony.food > 0 && this.hunger > this.STATIC.HUNGER_PER_FOOD){
				this.hunger -= this.STATIC.HUNGER_PER_FOOD;
				this.antColony.food--;
			}
		}
		// Check if food is found
		if (this.world.food[this.x][this.y] > 0){
			this.world.food[this.x][this.y]--;
			this.carryingFood = true;
			this.foodPheromone = 1;
		}
	}

	// Spread pheromones
	this.antColony.homePheromones[this.x][this.y] = Math.max(this.antColony.homePheromones[this.x][this.y], this.homePheromone);
	this.antColony.exitPheromones[this.x][this.y] = Math.max(this.antColony.exitPheromones[this.x][this.y], this.exitPheromone);
	this.antColony.foodPheromones[this.x][this.y] = Math.max(this.antColony.foodPheromones[this.x][this.y], this.foodPheromone);

	// Loose pheromones
	this.homePheromone -= this.STATIC.HOME_PHERMONE_DECREASE;
	this.exitPheromone -= this.STATIC.EXIT_PHERMONE_DECREASE;
	this.foodPheromone -= this.STATIC.FOOD_PHERMONE_DECREASE;

	// Update timer
	this.homeSickTimer++;
};

//
// BASIC ACTIONS
//

Ant.prototype.walk = function() {
	// Sensorposition to check if it can walk forward in a nest
	var sensorPosition = this.getRelativeSensorPosition().center;
	if (
		(this.insideNest && this.antColony.nest[this.x + sensorPosition.x][this.y + sensorPosition.y]) ||
		!this.insideNest ) {
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
		// The borders are set like this because the ants can sample points on sensors in front of them
		if(this.x < 3)
			this.x = 3;
		if(this.x > this.world.width - 3)
			this.x = this.world.width - 3;
		if(this.y < 3)
			this.y = 3;
		if(this.y > this.world.height - 3)
			this.y = this.world.height - 3;
	}
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

Ant.prototype.dig = function() {
	var sensorPosition = this.getRelativeSensorPosition();

	var digPosX = this.x + sensorPosition.center.x;
	var digPosY = this.y + sensorPosition.center.y;

	var numReachableSensor = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (this.antColony.nest[digPosX + i][digPosY + j])
				numReachableSensor++;
		};
	};
	var numReachable = this.getNumReachable(this.antColony.nest);

	//console.log(sensorPosition);

	if (!this.antColony.nest[digPosX][digPosY] &&
		(numReachableSensor == 3 || numReachableSensor == 2) &&
		(numReachable > 2 && numReachable < 5)) {
		this.antColony.nest[digPosX][digPosY] = 1;
		this.carryingDirt = true;
	};
}

Ant.prototype.placeDirt = function() {
	// The ant can only place dirt at the rim of the anthill
	var sensorPosition = this.getRelativeSensorPosition();
	var numReachableSensor = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (this.antColony.antHill[this.x + sensorPosition.center.x + i][this.y + sensorPosition.center.x + j])
				numReachableSensor++;
		};
	};
	if (!this.antColony.antHill[this.x + sensorPosition.center.x][this.y + sensorPosition.center.y] &&
		(numReachableSensor >= 3)) {
		this.antColony.antHill[this.x + sensorPosition.center.x][this.y + sensorPosition.center.y] += 1;
		this.carryingDirt = false;
	};
}

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

Ant.prototype.getNumReachable = function(map) {
	var numReachable = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (map[this.x + i][this.y + j])
				numReachable++;
		};
	};
	return numReachable;
}

Ant.prototype.getDirectionToHighestPheromone = function(pheromoneMap) {
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

Ant.prototype.getRelativeSensorPosition = function() {
	var sensorPoints = {};
	sensorPoints.left = {};
	sensorPoints.center = {};
	sensorPoints.right = {};

	switch(this.angle) {
	    case 0:
	        sensorPoints.left.x = 1;
	        sensorPoints.left.y = -1;
	        sensorPoints.center.x = 1;
	        sensorPoints.center.y = 0;
	        sensorPoints.right.x = 1;
	        sensorPoints.right.y = 1;
	        break;
	    case 1:
	        sensorPoints.left.x = 1;
	        sensorPoints.left.y = 0;
	        sensorPoints.center.x = 1;
	        sensorPoints.center.y = 1;
	        sensorPoints.right.x = 0;
	        sensorPoints.right.y = 1;
	        break;
	    case 2:
	        sensorPoints.left.x = 1;
	        sensorPoints.left.y = 1;
	        sensorPoints.center.x = 0;
	        sensorPoints.center.y = 1;
	        sensorPoints.right.x = -1;
	        sensorPoints.right.y = 1;
	        break;
	    case 3:
	        sensorPoints.left.x = 1;
	        sensorPoints.left.y = 0;
	        sensorPoints.center.x = -1;
	        sensorPoints.center.y = 1;
	        sensorPoints.right.x = -1;
	        sensorPoints.right.y = 0;
	        break;
	    case 4:
	        sensorPoints.left.x = -1;
	        sensorPoints.left.y = 1;
	        sensorPoints.center.x = -1;
	        sensorPoints.center.y = 0;
	        sensorPoints.right.x = -1;
	        sensorPoints.right.y = -1;
	        break;
	    case 5:
	        sensorPoints.left.x = -1;
	        sensorPoints.left.y = 0;
	        sensorPoints.center.x = -1;
	        sensorPoints.center.y = -1;
	        sensorPoints.right.x = 0;
	        sensorPoints.right.y = -1;
	        break;
	    case 6:
	        sensorPoints.left.x = -1;
	        sensorPoints.left.y = -1;
	        sensorPoints.center.x = 0;
	        sensorPoints.center.y = -1;
	        sensorPoints.right.x = 1;
	        sensorPoints.right.y = -1;
	        break;
	    case 7:
	        sensorPoints.left.x = 0;
	        sensorPoints.left.y = -1;
	        sensorPoints.center.x = 1;
	        sensorPoints.center.y = -1;
	        sensorPoints.right.x = 1;
	        sensorPoints.right.y = 0;
	        break;
	    default:
	        break;
	}
	return sensorPoints;
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
	var pheromoneDirectionToHome = this.getDirectionToHighestPheromone(this.antColony.homePheromones)

	var random = Math.random();
	if (pheromoneDirectionToHome != -1 && random > 0.1) {
		this.angle = pheromoneDirectionToHome;
		this.walk();
	}
	else{
		this.wander();
	}
}

Ant.prototype.lookForExit = function() {
	// Find the way
	var pheromoneDirectionToExit = this.getDirectionToHighestPheromone(this.antColony.exitPheromones)

	var random = Math.random();
	if (pheromoneDirectionToExit != -1 && random > 0.1) {
		this.angle = pheromoneDirectionToExit;
		this.walk();
	}
	else{
		this.wander();
	}
}

Ant.prototype.lookForFood = function() {
	// Find the way
	var pheromoneDirectionToFood = this.getDirectionToHighestPheromone(this.antColony.foodPheromones)

	var random = Math.random();
	if (pheromoneDirectionToFood != -1 && random > 0.1) {
		this.angle = pheromoneDirectionToFood;
		this.walk();
	}
	else{
		this.wander();
	}
}

Ant.prototype.digNest = function() {
	if (!this.insideNest){
		this.lookForHome();
	}
	else {
		this.wander();
		this.dig();
	}
}

Ant.prototype.buildAntHill = function() {
	if (!this.carryingDirt){
		this.digNest();
	}
	else {
		if (this.insideNest){
			this.lookForExit();
		}
		else {
			this.wander();
			this.placeDirt();
		}
	}
}

