//
// Simulator
//

function Simulator (world) {
	this.world = world;
	this.updatesPerWait = 1;
	this.skip = 0;
};

Simulator.prototype.start = function(simParams) {
	this.updatesPerWait = simParams.updatesPerWait;
	this.waitTime = simParams.waitTime;

	var slider = document.getElementById('slider');
	var updatesPerWaitElement = document.getElementById('updatesPerWait');

	var thisSimulator = this;
	this.loop = setInterval(function() {
		if(--thisSimulator.skip > 0){
			return;
		}

		var sliderVal = +slider.value;
		thisSimulator.skip = sliderVal < 10 ? Math.min(Math.pow(2,(10-sliderVal)), 50) : 0;
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
					for (var k = 0; k < thisSimulator.world.antColonies.length; k++) {
						if (thisSimulator.world.antColonies[k].homePheromones[i][j] > 0) {
							thisSimulator.world.antColonies[k].homePheromones[i][j] *= 0.9999;
							if (thisSimulator.world.antColonies[k].homePheromones[i][j] < 0.001)
								thisSimulator.world.antColonies[k].homePheromones[i][j] = 0;
						}
						if (thisSimulator.world.antColonies[k].foodPheromones[i][j] > 0) {
							thisSimulator.world.antColonies[k].foodPheromones[i][j] *= 0.995;
							if (thisSimulator.world.antColonies[k].foodPheromones[i][j] < 0.001)
								thisSimulator.world.antColonies[k].foodPheromones[i][j] = 0;
						}	
					};
					
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
