//
// WorldVisualizer
//

function WorldVisualizer (world) {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
	var bmd;
	var bitmapSprite;
	
	function preload() {

	}
	
	function create() {
        bmd = game.add.bitmapData(800,600);
        bitmapSprite = game.add.sprite(0, 0, bmd);
	}
	
	function update() {		
		bmd.clear(0,0,800,600);
		var foodRadius = 10;
		var agentRadius = 10;
		// Draw food
		for (var i = 0; i < world.foods.length; i++) {
			var food = world.foods[i];
			// Draw circle
			bmd.ctx.fillStyle = '#994444';
			bmd.ctx.beginPath();
			bmd.ctx.arc(food.x, food.y, foodRadius, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.fill();
		}
		// Draw agents
		for (var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			// Draw circle
			bmd.ctx.fillStyle = '#999999';
			bmd.ctx.beginPath();
			bmd.ctx.arc(agent.x, agent.y, agentRadius, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.fill();
			// Draw direction indicator
			bmd.ctx.strokeStyle = '#FFFFFF';
			bmd.ctx.lineWidth = 5;
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(agent.x, agent.y);
			bmd.ctx.lineTo(agent.x + Math.cos(agent.dir) * agentRadius, agent.y + Math.sin(agent.dir) * agentRadius);
			bmd.ctx.stroke();
		}

	}
}