//
// WorldVisualizer
//

function WorldVisualizer (world) {

	// PHASER GAME
    var phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {
    	phaserGame.load.image('agentSprite', 'assets/sprites/star.png');
	}

	function create() {
		for (var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			phaserGame.add.sprite(agent.x, agent.y, 'agentSprite');
		}
	}
	
	function update() {
		for (var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
		}
	}
}