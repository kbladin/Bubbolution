//
// Simulator
//

function Simulator (world) {
	this.world = world;
	for (var i = 0; i < 10; i++) {

		var a = Agent.prototype.createAtRandomPosition(world.width, world.height);
		this.world.agents.push(a);
	}
};

Simulator.prototype.start = function(waitTime) {
	this.loop = setInterval(this.update, waitTime);
};

Simulator.prototype.stop = function() {
	clearInterval(this.loop)
};

Simulator.prototype.update = function() {
	console.log("Simulator update");
};