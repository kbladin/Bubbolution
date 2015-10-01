//
// Agent
//
var agentCount = 0;

function Agent (world, x, y, angle) {
	this.world = world;
	this.id = 'a' + agentCount++;

    // Position and orientation
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.alive = true;

    // Neural network input
  	this.fullness = 100
    this.health = 100;
	
};

// STATIC CONSTANTS
Agent.prototype.constants = {
	WALKSPEED: 9.9,
	ANGULAR_SPEED: Math.PI / 16,

	MAX_FULLNESS: 100,
	MAX_HEALTH: 100,
	
	ATTENTION_RADIUS: 100,
	REACHABLE_RADIUS: 10,

	FULLNESS_PER_FOOD: 40,
	DAMAGE_PER_HIT: 30,

	FULLNESS_DECREASE_RATE: 0.2,
	HEALTH_INCREASE_RATE: 0.1,
	HEALTH_DECREASE_RATE: 0.2,

	MATING_FULLNESS_COST: 50,
	MATING_HEALTH_COST: 20,
};


Agent.prototype.update = function() {
	if(this.fullness > 0){
		this.fullness = Math.min(this.fullness, this.constants.MAX_FULLNESS);
		this.fullness -= this.constants.FULLNESS_DECREASE_RATE;
		if(this.fullness > this.constants.MAX_FULLNESS*0.5 &&
			this.health < this.constants.MAX_HEALTH)
		{
			this.health += this.constants.HEALTH_INCREASE_RATE;
		}
	}
	else{
		this.health -= this.constants.HEALTH_DECREASE_RATE;
		if(this.health < 0){
			this.world.removeAgent(this);
			this.world.numDeadAgents++; //Ugly to do stats things here
		}
	}
};


Agent.prototype.createAtRandomPosition = function(world){
	var a = new Agent(world);
	a.x = world.width * Math.random();
	a.y = world.height * Math.random();
	a.angle = 2 * Math.PI * Math.random() - Math.PI;
	return a;
}



//
// BASIC ACTIONS
//

Agent.prototype.walk = function() {
	var dirX = Math.cos(this.angle);
	var dirY = Math.sin(this.angle);

	var slowFactor = this.fullness > this.constants.MAX_FULLNESS ? 0.5 : 1;
	this.x += dirX * this.constants.WALKSPEED*slowFactor;
	this.y += dirY * this.constants.WALKSPEED*slowFactor;

	if(this.x < 0 || this.world.width < this.x ||
		this.y< 0 || this.world.height < this.y){

		this.angle += Math.PI*0.5 + Math.PI*Math.random();
		this.x = Math.min(this.world.width, Math.max(this.x, 0));
		this.y = Math.min(this.world.height, Math.max(this.y, 0));
	}

	this.update();
};

Agent.prototype.idle = function(){
	// Do nothing
	return;
}

Agent.prototype.walkSideWaysRight = function() {
	walkInDirection(Math.PI / 2);
};

Agent.prototype.walkSideWaysLeft = function() {
	walkInDirection(-Math.PI / 2);
};

Agent.prototype.walkInDirection = function(angle) {
	var dirX = Math.cos(this.angle + angle);
	var dirY = Math.sin(this.angle + angle);
	this.x += dirX * this.constants.WALKSPEED;
	this.y += dirY * this.constants.WALKSPEED;
	this.update();
};

Agent.prototype.turnLeft = function() {
	this.angle -= this.constants.ANGULAR_SPEED;
	if(this.angle < -Math.PI){
		this.angle += 2*Math.PI;
	}
};

Agent.prototype.turnRight = function() {
	this.angle += this.constants.ANGULAR_SPEED;
	if(Math.PI < this.angle){
		this.angle -= 2*Math.PI;
	}
};

Agent.prototype.attack = function() {
	var agents = this.world.getAgentsWithinRadius(this, this.constants.REACHABLE_RADIUS, true);
	if(agents){
		var targetAgent = agents[0];
		targetAgent.receiveAttackedFrom(this);
	}
};

Agent.prototype.receiveAttackedFrom = function (attacker) {
	this.health -= DAMAGE_PER_HIT;
	if(this.health <= 0){
		// I just died??
		this.alive = false;
		this.world.removeAgent(this);
	}
}



Agent.prototype.wander = function() {
	var r = Math.random();
	if (r < 0.33) {
		this.turnLeft();
	}
	else if (0.67 > r) {
		this.turnRight();
	}
	this.walk();
}

Agent.prototype.isReachable = function (o) {
	var reachableDist2 = this.constants.REACHABLE_RADIUS*this.constants.REACHABLE_RADIUS;
	var dist2ToObject = this.dist2To(o);
	return dist2ToObject < reachableDist2;
}

Agent.prototype.eat = function(food){
	if(this.world.removeFood(food)){
		this.fullness += this.constants.FULLNESS_PER_FOOD;
	}
}

Agent.prototype.mate = function(agent) {
	// Both mating agents lose fullness
	this.fullness -= this.constants.MATING_FULLNESS_COST;
	this.fullness = Math.max(this.fullness, 0);

	agent.fullness -= agent.constants.MATING_FULLNESS_COST;
	agent.fullness = Math.max(agent.fullness, 0);

	// Both mating agetns lose health
	this.health -= this.constants.MATING_HEALTH_COST;
	agent.health -= agent.constants.MATING_HEALTH_COST;

	// Give birth to baby agent
	var x = this.x + 10*Math.random();
	var y = this.y + 10*Math.random();
	var angle = this.angle + Math.PI;
	var babyAgent = new Agent(this.world, x, y, angle);

	babyAgent.fullness = Math.min(this.fullness, agent.fullness);
	babyAgent.health = Math.min(this.health, agent.health);

	this.world.agents.push(babyAgent);
	this.world.numBornAgents++; // ugly to do stats things here!
};






//
// HIGH LEVEL ACTIONS
//

Agent.prototype.isFacing = function (pos) {
	return Math.abs(this.angleDiff(pos)) < 0.5*this.constants.ANGULAR_SPEED;
}

Agent.prototype.goAnd = function(action, target){
	if(this.isReachable(target)){
		// When evaluating action, we force the this
		// variable to keep point to this.
		action.call(this, target);
	}
	else{
		this.walkTo(target);
	}
}

Agent.prototype.turnTo = function (pos) {
	var aDiff = this.angleDiff(pos);
	if(aDiff < -this.constants.ANGULAR_SPEED * 0.5){
		this.turnLeft();
		return false;
	}
	if (this.constants.ANGULAR_SPEED * 0.5 < aDiff){
		this.turnRight();
		return false;
	}
	return true;
}

Agent.prototype.walkTo = function(pos){
	if(this.turnTo(pos)){
		this.walk();
	}
}

Agent.prototype.findAndEatFood = function() {
	var nearbyFoods = this.world.getFoodsWithinRadius(this, this.constants.ATTENTION_RADIUS, true);
	if(nearbyFoods.length > 0){
		var food = nearbyFoods[0].gameObject;
		this.goAnd(this.eat, food);
	}
	else{
		this.wander();
	}
};

Agent.prototype.findAndMateAgent = function() {
	var nearbyAgents = this.world.getAgentsWithinRadius(this, this.constants.ATTENTION_RADIUS, false);
	if(nearbyAgents.length > 0){
		nearbyAgents.sort(function (a,b) {return b.health - a.health;});
		var healthyAgent = nearbyAgents[0].gameObject;
		this.goAnd(this.mate, healthyAgent);
	}
	else{
		this.wander();
	}
}

// This action is only for testing basic behavior
Agent.prototype.smartAction = function(){
	if(this.health > 0.6 * this.constants.MAX_HEALTH){
		this.findAndMateAgent();
	}
	else{
		this.findAndEatFood();
	}
}



Agent.prototype.toString = function () {
	return JSON.stringify({
		health: this.health.toFixed(2),
		fullness: this.fullness.toFixed(2),
	});
}