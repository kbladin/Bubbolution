//
// Simulator
//

function Simulator (world) {
	this.world = world;
	this.updatesPerWait = 1;

	for (var i = 0; i < 200; i++) {
		var a = new Ant(world, world.width / 2, world.height / 2, 0);
		world.ants.push(a);
	}
};

Simulator.prototype.start = function(simParams) {
	this.updatesPerWait = simParams.updatesPerWait;

	var slider = document.getElementById('slider');
	var updatesPerWaitElement = document.getElementById('updatesPerWait');

	var thisSimulator = this;
	this.loop = setInterval(function() {

		var sliderVal = +slider.value;
		thisSimulator.updatesPerWait = Math.ceil(sliderVal*sliderVal * 0.0001 * 50);
		updatesPerWaitElement.textContent = thisSimulator.updatesPerWait;

		thisSimulator.world.numUpdates += thisSimulator.updatesPerWait;
		for (var n = 0; n < thisSimulator.updatesPerWait; n++) {
			//Update ants
			for (var i = 0; i < thisSimulator.world.ants.length; ++i) {
				thisSimulator.world.ants[i].act();
			};

			// Update world
			for (var i = 0; i < thisSimulator.world.width; i++) {
				for (var j = 0; j < thisSimulator.world.height; j++) {
					if (thisSimulator.world.homePheromones[i][j] > 0) {
						thisSimulator.world.homePheromones[i][j] *= 0.9999;
						if (thisSimulator.world.homePheromones[i][j] < 0.001)
							thisSimulator.world.homePheromones[i][j] = 0;
					}
					if (thisSimulator.world.foodPheromones[i][j] > 0) {
						thisSimulator.world.foodPheromones[i][j] *= 0.995;
						if (thisSimulator.world.foodPheromones[i][j] < 0.001)
							thisSimulator.world.foodPheromones[i][j] = 0;
					}
				};				
			};
		}


	}, simParams.waitTime);
};

Simulator.prototype.stop = function() {
	clearInterval(this.loop)
	console.log('numUpdates:', this.world.numUpdates);
	/*console.log(this.world.agents.map(function(a) {
		return a.toString();
	}));
	*/
};
