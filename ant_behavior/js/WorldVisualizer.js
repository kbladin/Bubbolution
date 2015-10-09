//
// WorldVisualizer
//

function WorldVisualizer (world, width, height) {
	var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
	var bmd;
	var bitmapSprite;
	
	function preload() {

	}
	
	function create() {
        bmd = game.add.bitmapData(width, height);
        bitmapSprite = game.add.sprite(0, 0, bmd);
	}

	function rgb(r,g,b){
		return'rgb(' + r + ',' + g + ',' + b + ')';
	}

	function rgba(r,g,b,a){
		return'rgb(' + r + ',' + g + ',' + b + ',' + a + ')';
	}
	
	function update() {		
		bmd.clear(0,0,width, height);
		var antRadius = 5;

		// Draw pheromones
		for (var i = 0; i < world.width; i++) {
			for (var j = 0; j < world.height; j++) {
				var xPos = width / world.width * i;
				var yPos = height / world.height * j;
				if (world.food[i][j] > 0) {
					// Draw circle
					bmd.ctx.fillStyle = rgb(0,100,0);
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, 2, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};
				if (world.nest[i][j] > 0) {
					// Draw circle
					bmd.ctx.fillStyle = rgb(100,50,0);
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, 2, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};
				if (world.homePheromones[i][j] > 0) {
					// Draw circle
					var intensity = world.homePheromones[i][j].toFixed(5);
					bmd.ctx.fillStyle = "rgba(250,250,0," + intensity + ")";
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, 2, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};

				if (world.foodPheromones[i][j] > 0) {
					// Draw circle
					var intensity = world.foodPheromones[i][j].toFixed(5);
					bmd.ctx.fillStyle = "rgba(0,250,255," + intensity + ")";
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, 2, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};
				if (world.exitPheromones[i][j] > 0) {
					// Draw circle
					var intensity = world.homePheromones[i][j].toFixed(5);
					bmd.ctx.fillStyle = "rgba(250,0,0," + intensity + ")";
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, 2, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};
				/*
				if (world.buildMaterial[i][j] > 0) {
					// Draw circle
					bmd.ctx.fillStyle = rgb(50,50,50);
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, 2, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};
				*/
				if (world.entrances[i][j] > 0) {
					// Draw circle
					bmd.ctx.fillStyle = rgb(255,0,0);
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, 2, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};
			};				
		};
		// Draw ants
		for (var i = 0; i < world.ants.length; i++) {
			var ant = world.ants[i];

			var xPos = width / world.width * ant.x;
			var yPos = height / world.height * ant.y;

			// Draw circle
			if(ant.carryingFood)
				bmd.ctx.fillStyle = '#FF9900';
			else if(ant.carryingDirt)
				bmd.ctx.fillStyle = '#999999';
			else if(ant.lostInsideNest)
				bmd.ctx.fillStyle = '#FF00FF';
			else
				bmd.ctx.fillStyle = '#FFFFFF';
			bmd.ctx.beginPath();
			bmd.ctx.arc(xPos, yPos, antRadius, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.fill();
			// Draw direction indicator
			if(ant.insideNest)
				bmd.ctx.strokeStyle = '#000000';
			else
				bmd.ctx.strokeStyle = '#9999FF';
			bmd.ctx.lineWidth = 5;
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(xPos, yPos);
			bmd.ctx.lineTo(xPos + Math.cos(ant.angle / 7 * 2*Math.PI) * antRadius, yPos + Math.sin(ant.angle / 7 * 2*Math.PI) * antRadius);
			bmd.ctx.stroke();
		}
	}
}