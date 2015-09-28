//
// WorldVisualizer
//

function WorldVisualizer (world) {

	var spriteMap = {};
	
	// PHASER GAME
    var phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {
    	phaserGame.load.image('agentSprite', 'assets/sprites/star.png');
    	phaserGame.load.image('foodSprite', 'assets/sprites/burger.png');
	}

	function create() {
		for (var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			spriteMap['a'+agent.id] = phaserGame.add.sprite(agent.x, agent.y, 'agentSprite');
		}

		for(var i = 0; i<world.foods.length; ++i){
			var food = world.foods[i];
			spriteMap['f'+food.id] = phaserGame.add.sprite(food.x, food.y, 'foodSprite');
		}
	}
	
	function update() {
		for (var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			var sprite = spriteMap['a'+agent.id];
			sprite.x = agent.x;
			sprite.y = agent.y;
		}
	}
}