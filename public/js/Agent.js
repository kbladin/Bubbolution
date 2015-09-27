//
// Agent
//

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
};

// STATIC CONSTNTS
Agent.prototype.constants = {
	WALKSPEED: 1,
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

Agent.prototype.eat = function() {

};

Agent.prototype.hit = function() {

};

Agent.prototype.mate = function() {

};

// HighLevel actions

Agent.prototype.eatClosestFood = function() {

};