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

        var canvasElement = document.getElementsByTagName('canvas')[0];
        canvasElement.style.float = "left";
	}

	function rgb(r,g,b){
		return'rgb(' + r + ',' + g + ',' + b + ')';
	}

	function rgba(r,g,b,a){
		return'rgb(' + r + ',' + g + ',' + b + ',' + a + ')';
	}
	
	function update() {		
		bmd.clear(0,0,width, height);
		
		// To decide what to draw
		var aboveGround = document.getElementById('aboveGroundRadio').checked;
		var drawPheromones = document.getElementById('drawPheromonesCheckBox').checked;
		var drawAnts = document.getElementById('drawAntsCheckBox').checked;
		var detailedGraphics = document.getElementById('drawDetailedCheckBox').checked;

		bmd.ctx.fillStyle = aboveGround ? rgb(219, 184, 77) : rgb(0,0,0);
		bmd.ctx.beginPath();
		bmd.ctx.fillRect(0, 0, width, height);
		bmd.ctx.closePath();
		bmd.ctx.fill();

		var dw = width / world.width;
		var dh = height / world.height;

		for (var i = 0; i < world.width; i++) {
			for (var j = 0; j < world.height; j++) {
				var xPos = dw * i - 0.5 * dw;
				var yPos = dh * j - 0.5 * dh;

				if (aboveGround) {
					if (world.food[i][j] > 0) {
						bmd.ctx.fillStyle = rgb(0,150,0);
						bmd.ctx.beginPath();
						bmd.ctx.fillRect(xPos, yPos, dw, dh);
						bmd.ctx.closePath();
						bmd.ctx.fill();
					};
				}
				for (var k = 0; k < world.antColonies.length; k++) {
					if (aboveGround) {
						if(world.antColonies[k].antHill[i][j] > 0){
							bmd.ctx.fillStyle = rgb(150,100,50);
							bmd.ctx.beginPath();
							bmd.ctx.fillRect(xPos, yPos, dw, dh);
							bmd.ctx.closePath();
							bmd.ctx.fill();
						};
					} 
					else {
						if(world.antColonies[k].nest[i][j] > 0){
							bmd.ctx.fillStyle = rgb(80, 50, 20);
							bmd.ctx.beginPath();
							bmd.ctx.fillRect(xPos, yPos, dw, dh);
							bmd.ctx.closePath();
							bmd.ctx.fill();
						};
					}


					// PHEROMONES
					if (drawPheromones){
						if (aboveGround){
							if (world.antColonies[k].homePheromones[i][j] > 0) {
								var intensity = world.antColonies[k].homePheromones[i][j].toFixed(5);
								bmd.ctx.fillStyle = "rgba(250,250,0," + intensity + ")";
								bmd.ctx.beginPath();
								bmd.ctx.fillRect(xPos, yPos, dw, dh);
								bmd.ctx.closePath();
								bmd.ctx.fill();
							};

							if (world.antColonies[k].foodPheromones[i][j] > 0) {
								var intensity = world.antColonies[k].foodPheromones[i][j].toFixed(5);
								bmd.ctx.fillStyle = "rgba(0,250,255," + intensity + ")";
								bmd.ctx.beginPath();
								bmd.ctx.fillRect(xPos, yPos, dw, dh);
								bmd.ctx.closePath();
								bmd.ctx.fill();
							};
						}
						else{
							if (world.antColonies[k].exitPheromones[i][j] > 0) {
								var intensity = world.antColonies[k].exitPheromones[i][j].toFixed(5);
								bmd.ctx.fillStyle = "rgba(250,0,0," + intensity + ")";
								bmd.ctx.beginPath();
								bmd.ctx.fillRect(xPos, yPos, dw, dh);
								bmd.ctx.closePath();
								bmd.ctx.fill();
							};
						}
					}					
				};
			};			
		};

		for (var i = 0; i < world.antColonies.length; i++) {
			var anthill = world.antColonies[i]
			bmd.ctx.fillStyle = rgb(255,0,0);
			bmd.ctx.beginPath();
			bmd.ctx.fillRect((anthill.x-0.5)*dw, (anthill.y-0.5)*dh, dw, dh);
			bmd.ctx.closePath();
			bmd.ctx.fill();
		};

		// Draw ants
		if (drawAnts){
			for (var i = 0; i < world.ants.length; i++) {
				var ant = world.ants[i];

				var antRadius = (ant instanceof AntQueen) ? 1.3 : 0.7;
				antRadius *= width / world.width;

				var xPos = dw * ant.x;
				var yPos = dh * ant.y;

				if (aboveGround == !ant.insideNest) {
					var directionVector = {
						x: Math.cos(ant.angle / 8 * 2*Math.PI),
						y: Math.sin(ant.angle / 8 * 2*Math.PI)
					};
					if (detailedGraphics){
						bmd.ctx.strokeStyle = '#333333';
							
						rSqrt2 = antRadius*1.2 / (Math.sqrt(2));

						bmd.ctx.lineWidth = antRadius * 0.2;
						bmd.ctx.beginPath();
						bmd.ctx.moveTo(xPos - rSqrt2, yPos - rSqrt2);
						bmd.ctx.lineTo(xPos + rSqrt2, yPos + rSqrt2);
						bmd.ctx.stroke();

						bmd.ctx.lineWidth = antRadius * 0.2;
						bmd.ctx.beginPath();
						bmd.ctx.moveTo(xPos, yPos - antRadius * 1.2);
						bmd.ctx.lineTo(xPos, yPos + antRadius * 1.2);
						bmd.ctx.stroke();

						bmd.ctx.lineWidth = antRadius * 0.2;
						bmd.ctx.beginPath();
						bmd.ctx.moveTo(xPos - antRadius * 1.2, yPos);
						bmd.ctx.lineTo(xPos + antRadius * 1.2, yPos);
						bmd.ctx.stroke();

						bmd.ctx.lineWidth = antRadius * 0.2;
						bmd.ctx.beginPath();
						bmd.ctx.moveTo(xPos + rSqrt2, yPos - rSqrt2);
						bmd.ctx.lineTo(xPos - rSqrt2, yPos + rSqrt2);
						bmd.ctx.stroke();

						// Center piece
						bmd.ctx.fillStyle = '#FF9900';
						bmd.ctx.beginPath();
						bmd.ctx.arc(xPos, yPos, antRadius * 0.4, 0, Math.PI*2, true); 
						bmd.ctx.closePath();
						bmd.ctx.fill();
						// Back piece
						bmd.ctx.fillStyle = '#772222';
						bmd.ctx.beginPath();
						bmd.ctx.arc(xPos - directionVector.x*antRadius, yPos - directionVector.y*antRadius, antRadius * 0.7, 0, Math.PI*2, true); 
						bmd.ctx.closePath();
						bmd.ctx.fill();
						// Head piece
						bmd.ctx.fillStyle = '#550000';
						bmd.ctx.beginPath();
						bmd.ctx.arc(xPos + directionVector.x*antRadius * 0.6, yPos + directionVector.y*antRadius*0.6, antRadius * 0.6, 0, Math.PI*2, true); 
						bmd.ctx.closePath();
						bmd.ctx.fill();
					} else {
						// Center piece
						bmd.ctx.fillStyle = '#550000';
						bmd.ctx.beginPath();
						bmd.ctx.arc(xPos, yPos, antRadius, 0, Math.PI*2, true); 
						bmd.ctx.closePath();
						bmd.ctx.fill();

						bmd.ctx.strokeStyle = '#FF9900';

						bmd.ctx.lineWidth = antRadius;
						bmd.ctx.beginPath();
						bmd.ctx.moveTo(xPos, yPos);
						bmd.ctx.lineTo(xPos + directionVector.x * antRadius, yPos + directionVector.y * antRadius);
						bmd.ctx.stroke();
					}
				}
			}
		}
	}
}