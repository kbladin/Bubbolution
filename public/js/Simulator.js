//
// Simulator
//

function Simulator (world) {
	this.world = world;
	this.updatesPerWait = 1;


	for (var i = 0; i < 3; i++) {
		var pos = world.getRandomPosition();
		console.log(pos);
		var foodSpawner = new FoodSpawner(world, pos.x, pos.y, 100, 200);
		world.foodSpawners.push(foodSpawner);
	}

	for (var i = 0; i < 3; i++) {
		var a = Agent.prototype.createAtRandomPosition(world);
		world.agents.push(a);
	}

	for (var i = 0; i < 0; i++) {
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

			//Update foodSpawners
			for (var i = 0; i < thisSimulator.world.foodSpawners.length; ++i){
				thisSimulator.world.foodSpawners[i].update();
			}

			//Update agents
			for (var i = 0; i < thisSimulator.world.agents.length; ++i) {
				var a = thisSimulator.world.agents[i];
				a.findAndEatFood();
			};
			
		}
	}, simParams.waitTime);
};

Simulator.prototype.stop = function() {
	clearInterval(this.loop)
	console.log('numUpdates:', numUpdates);
	console.log(this.world.agents.map(function(a) {
		return a.toString();
	}));
};
