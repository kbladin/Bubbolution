//
// Simulator
//

function Simulator (world) {
	this.world = world;
	this.updatesPerWait = 1;

	for (var i = 0; i < 2; i++) {
		var a = Agent.prototype.createAtRandomPosition(world);
		world.agents.push(a);
	}

	for (var i = 0; i < 10; i++) {
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
				var a = thisSimulator.world.agents[i];
				a.findAndEatFood();
			};
			
		}
	}, simParams.waitTime);
};

Simulator.prototype.stop = function() {
	clearInterval(this.loop)
	console.log('numUpdates:', numUpdates);
};
