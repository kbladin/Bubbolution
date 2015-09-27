//
// Agent
//

function Agent () {
    // State
    this.posX;
    this.posY;
    this.direction;
};

// Atomic actions

Agent.prototype.walk = function(dt, speed) {
	var dirX = Math.cos(this.direction);
	var dirY = Math.sin(this.direction);
	this.posX += dirX * speed * dt;
	this.posY += dirY * speed * dt;
};

Agent.prototype.walkSideways = function(dt, speed) {
	var dirX = Math.cos(this.direction + Math.PI / 2);
	var dirY = Math.sin(this.direction + Math.PI / 2);
	this.posX += dirX * speed * dt;
	this.posY += dirY * speed * dt;
};

Agent.prototype.turn = function(dt, angularVelocity) {
	this.direction += angularVelocity * dt;
};

Agent.prototype.pickUp = function(dt) {

};

Agent.prototype.eat = function() {

};

Agent.prototype.hit = function() {

};

Agent.prototype.mate = function() {

};

// HighLevel actions

Agent.prototype.functionName = function() {

};