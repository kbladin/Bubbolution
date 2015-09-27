//
// WorldVisualizer
//

function WorldVisualizer (world) {
    var phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	function preload() {
    	phaserGame.load.image('agentSprite', 'assets/sprites/star.png');
	}
	function create() {
		for (var i = 0; i < world.agents.length; i++) {
			console.log("HEJ");
			var agent = world.agents[i];
			phaserGame.add.sprite(100, 100, 'agentSprite');
		}
	}
	function update() {
		for (var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
		}
	}
}

WorldVisualizer.prototype.start = function(waitTime) {
	
};

WorldVisualizer.prototype.stop = function() {
	
};