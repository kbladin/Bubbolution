//
// Simulator
//

function Simulator (world) {
	this.world = world;
	for (var i = 0; i < 10; i++) {
		this.world.agents.push(new Agent());
	}
};

Simulator.prototype.start = function(waitTime) {
	
};

Simulator.prototype.stop = function() {
	
};

Simulator.prototype.update = function() {
	
};