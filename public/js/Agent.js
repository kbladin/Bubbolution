//
// Agent
//
var agentCount = 0;

function Agent (world, x,y,dir) {
	this.world = world;
	this.id = agentCount++;

    // Position and orientation
    this.x = x;
    this.y = y;
    this.angle = dir;
    this.alive = true;

    // Neural network input
  	this.fullness = 100
    this.health = 100;
	
};

// STATIC CONSTANTS
Agent.prototype.constants = {
	WALKSPEED: 9.9,
	ANGULAR_VELOCITY: Math.PI / 16,

	MAX_FULLNESS: 100,
	MAX_HEALTH: 100,
	
	ATTENTION_RADIUS: 500,
	REACHABLE_RADIUS: 5,

	FULLNESS_PER_FOOD: 40,
	DAMAGE_PER_HIT: 30,
};


Agent.prototype.createAtRandomPosition = function(world){
	var a = new Agent(world);
	a.x = world.width * Math.random();
	a.y = world.height * Math.random();
	a.angle = 2 * Math.PI * Math.random() - Math.PI;
	return a;
}




// Atomic actions
Agent.prototype.walk = function() {
	var dirX = Math.cos(this.angle);
	var dirY = Math.sin(this.angle);
	this.x += dirX * this.constants.WALKSPEED;
	this.y += dirY * this.constants.WALKSPEED;
};

Agent.prototype.walkSideways = function() {
	var dirX = Math.cos(this.angle + Math.PI / 2);
	var dirY = Math.sin(this.angle + Math.PI / 2);
	this.x += dirX * this.constants.WALKSPEED;
	this.y += dirY * this.constants.WALKSPEED;
};

Agent.prototype.turnLeft = function() {
	this.angle -= this.constants.ANGULAR_VELOCITY;
	if(this.angle < -Math.PI){
		this.angle += 2*Math.PI;
	}
};

Agent.prototype.turnRight = function() {
	this.angle += this.constants.ANGULAR_VELOCITY;
	if(Math.PI < this.angle){
		this.angle -= 2*Math.PI;
	}
};

Agent.prototype.tryEat = function() {
	var foods = this.world.getFoodsWithinRadius(this.x, this.y, this.constants.REACHABLE_RADIUS, true);
	if(foods){
		var eatenFood = foods[0];
		world.removeFood(eatenFood);
		fullness += this.constants.FULLNESS_PER_FOOD;
	}
};

Agent.prototype.attack = function() {
	var agents = this.world.getAgentsWithinRadius(this.x, this.y, this.constants.REACHABLE_RADIUS, true);
	if(agents){
		var targetAgent = agents[0];
		targetAgent.getAttackedBy(this);
	}
};

Agent.prototype.getAttackedBy = function (attacker) {
	this.health -= DAMAGE_PER_HIT;
	if(this.health <= 0){
		// I just died?? 
		this.alive = false;
		this.world.removeAgent(this);
	}
}

Agent.prototype.mate = function() {

};

Agent.prototype.wander = function() {
	if (Math.random() > 0.5) {
		this.turnLeft();
	}
	if (Math.random() > 0.5) {
		this.turnRight();
	}
	this.walk();
}

Agent.prototype.isReachable = function (o) {
	var reachableDist2 = this.REACHABLE_RADIUS*this.REACHABLE_RADIUS;
	return this.dist2To(o) < reachableDist2;
}

Agent.prototype.eat = function(food){
	this.fullness += FULLNESS_PER_FOOD;
	world.removeFood(food);
}





// HighLevel actions

Agent.prototype.isFacing = function (pos) {
	var aDiff = this.angleDiff(pos);
	if(Math.abs(aDiff) < this.constants.ANGULAR_VELOCITY*0.5){
		return true;
	}
	else{
		return false;
	}
}

Agent.prototype.turnTo = function (pos) {
	var aDiff = this.angleDiff(pos);
	if(aDiff < -this.constants.ANGULAR_VELOCITY * 0.5){
		this.turnLeft();
		return false;
	}
	if (this.constants.ANGULAR_VELOCITY * 0.5 < aDiff){
		this.turnRight();
		return false;
	}
	return true;
}

Agent.prototype.walkTo = function(pos){
	if(this.turnTo(pos)){
		this.walk();
		return;
	}
}

Agent.prototype.findAndEatFood = function() {
	var nearbyFoods = this.world.getFoodsWithinRadius(this.x, this.y, this.constants.ATTENTION_RADIUS, true);
	if(nearbyFoods.length > 0){
		var food = nearbyFoods[0].gameObject;
		if(this.isReachable(food)){
			this.eat(food);
		}
		else{
			this.walkTo(food);
		}
	}
	else{
		this.wander();
	}
};