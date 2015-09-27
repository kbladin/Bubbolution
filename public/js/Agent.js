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

Agent.prototype.walk = function(speed) {
	var dirX = Math.cos(this.direction);
	var dirY = Math.sin(this.direction);
	this.posX += dirX * speed;
	this.posY += dirY * speed;
};

Agent.prototype.walkSideways = function(speed) {
	var dirX = Math.cos(this.direction + Math.PI / 2);
	var dirY = Math.sin(this.direction + Math.PI / 2);
	this.posX += dirX * speed;
	this.posY += dirY * speed;
};

Agent.prototype.turn = function(angularVelocity) {
	this.direction += angularVelocity;
};

Agent.prototype.pickUp = function() {

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