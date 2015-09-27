//
// WorldVisualizer
//

function WorldVisualizer (world) {
    this.phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update });
	this.world = world;
	console.log("VIS CONSTRUCTOR");
	console.log(this.phaserGame);
}

WorldVisualizer.prototype.preload = function() {
    this.phaserGame.load.image('agentSprite', 'assets/sprites/star.png');
	console.log("PRELOADED");
}

WorldVisualizer.prototype.create = function() {
	//for (var i = 0; i < simWorld.agents.length; i++) {
	//	var agent = simWorld.agents[i];
	//	this.phaserGame.add.sprite(agent.posX, agent.posY, 'agentSprite');
	//}
	console.log("CREATED");
}

WorldVisualizer.prototype.update = function() {
	//for (var i = 0; i < simWorld.agents.length; i++) {
	//	var agent = simWorld.agents[i];
	//}
}
