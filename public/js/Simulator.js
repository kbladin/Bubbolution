//
// Simulator
//

function Simulator (world) {
	this.world = world;
	this.updatesPerWait = 1;

	for (var i = 0; i < 1; i++) {
		var a = Agent.prototype.createAtRandomPosition(world);
		world.agents.push(a);
	}

	for (var i = 0; i < 1; i++) {
		var pos = world.getRandomPosition();
		world.foods.push(new Food(world, pos.x, pos.y));
	};

};

var numUpdates = 0;
Simulator.prototype.start = function(simParams) {
	this.updatesPerWait = simParams.updatesPerWait;
	var thisSimulator = this;
	this.loop = setInterval(function() {
		numUpdates += thisSimulator.updatesPerWait;
		for (var n = 0; n < thisSimulator.updatesPerWait; n++) {
			for (var i = 0; i < thisSimulator.world.agents.length; i++) {
				//thisSimulator.world.agents[i].wander();
			};

			var a = thisSimulator.world.agents[0];
			var f = thisSimulator.world.foods[0];

			a.findAndEatFood();
		}
	}, simParams.waitTime);
};

Simulator.prototype.stop = function() {
	clearInterval(this.loop)
	console.log('numUpdates:', numUpdates);
};
