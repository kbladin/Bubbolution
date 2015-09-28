//
// Simulator
//

function Simulator (world) {
	this.world = world;

	for (var i = 0; i < 3; i++) {
		var a = Agent.prototype.createAtRandomPosition(world);
		world.agents.push(a);
	}

	for (var i = 0; i < 3; i++) {
		var pos = world.getRandomPosition();
		world.foods.push(new Food(world, pos.x, pos.y));
	};

};

Simulator.prototype.start = function(waitTime) {
	this.loop = setInterval(this.update, waitTime);
};

Simulator.prototype.stop = function() {
	clearInterval(this.loop)
};

Simulator.prototype.update = function() {
	//console.log("Simulator update:", JSON.stringify(this.world));

	console.log(world.getAgentsWithinRadius(10, 10, 350, true));

	for (var i = 0; i < this.world.agents.length; i++) {
		this.world.agents[i].walk(3*Math.random());
	};
};