//
// Simulator
//

function Simulator (world) {
	this.world = world;
};

Simulator.prototype.initialize = function() {
	for (var i = 0; i < 10; i++) {
		this.world.agents.push(new Agent());
	}
};

Simulator.prototype.update = function(dt) {
	
};