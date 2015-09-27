//
// Agent
//

var agentCount = 0;

function Agent (x,y,dir) {
    // State for each Agent

    // Position and orientation
    this.x = x;
    this.y = y;
    this.dir = dir;

    // 
  	this.fullness = 100
    this.health = 100;
    this.carma = 0;
	
	this.id = agentCount++;
};

// STATIC CONSTANTS
Agent.prototype.constants = {
	WALKSPEED: 10,
	ANGULAR_VELOCITY: Math.PI / 16,

	MAX_FULLNESS: 100,
	MAX_HEALTH: 100,
	
	ATTENTION_RADIUS: 300,
	REACHABLE_RADIUS: 5,
};


Agent.prototype.createAtRandomPosition = function(maxX, maxY){
	var a = new Agent();
	a.x = maxX * Math.random();
	a.y = maxY * Math.random();
	a.dir = 2 * Math.PI * Math.random();
	return a;
}

// Atomic actions
Agent.prototype.walk = function() {
	var dirX = Math.cos(this.dir);
	var dirY = Math.sin(this.dir);
	this.x += dirX * this.constants.WALKSPEED;
	this.y += dirY * this.constants.WALKSPEED;
};

Agent.prototype.walkSideways = function() {
	var dirX = Math.cos(this.dir + Math.PI / 2);
	var dirY = Math.sin(this.dir + Math.PI / 2);
	this.x += dirX * this.constants.WALKSPEED;
	this.y += dirY * this.constants.WALKSPEED;
};

Agent.prototype.turnLeft = function() {
	this.dir -= this.constants.ANGULAR_VELOCITY;
};

Agent.prototype.turnRight = function() {
	this.dir += this.constants.ANGULAR_VELOCITY;
};

Agent.prototype.eat = function() {

};

Agent.prototype.hit = function() {

};

Agent.prototype.mate = function() {

};

// HighLevel actions

Agent.prototype.eatClosestFood = function() {

};