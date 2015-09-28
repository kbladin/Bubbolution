//
// Agent
//

function Agent (world, x,y,dir) {
	this.world = world;
    // State for each Agent

    // Position and orientation
    this.x = x;
    this.y = y;
    this.dir = dir;

    // 
  	this.fullness = 100
    this.health = 100;
    this.carma = 0;
};

// STATIC CONSTNTS
Agent.prototype.constants = {
	WALKSPEED: 1,
	ANGULAR_VELOCITY: Math.PI / 16,

	MAX_FULLNESS: 100,
	MAX_HEALTH: 100,
	
	ATTENTION_RADIUS: 300,
	REACHABLE_RADIUS: 5,

	FULLNESS_PER_FOOD: 40,
	DAMAGE_PER_HIT: 30,
};


Agent.prototype.createAtRandomPosition = function(world){
	var a = new Agent(world);
	a.x = world.width * Math.random();
	a.y = world.height * Math.random();
	a.dir = 2 * Math.PI * Math.random();
	return a;
}




// Atomic actions
Agent.prototype.walk = function(speed) {
	var dirX = Math.cos(this.dir);
	var dirY = Math.sin(this.dir);
	this.x += dirX * speed;
	this.y += dirY * speed;
};

Agent.prototype.walkSideways = function(speed) {
	var dirX = Math.cos(this.dir + Math.PI / 2);
	var dirY = Math.sin(this.dir + Math.PI / 2);
	this.x += dirX * speed;
	this.y += dirY * speed;
};

Agent.prototype.turnLeft = function() {
	this.dir -= this.constants.ANGULAR_VELOCITY;
};

Agent.prototype.turnRight = function() {
	this.dir += this.constants.ANGULAR_VELOCITY;
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
		this.world.removeAgent(this);
	}
}

Agent.prototype.mate = function() {

};

// HighLevel actions

Agent.prototype.eatClosestFood = function() {

};