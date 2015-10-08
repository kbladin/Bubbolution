/*
var foodSpawnerCount = 0;
function FoodSpawner(world, x, y, radius, spawnTime){
	this.id = 'fs' + foodSpawnerCount++;
	this.world = world;

	var clampedPos = world.clampPosition(x, y, radius);
	this.x = clampedPos.x;
	this.y = clampedPos.y;
	this.radius = radius;
	this.spawnTime = spawnTime;

	this.lastSpawned = 0;
}

FoodSpawner.prototype.update = function() {
	if(this.lastSpawned++ === this.spawnTime){
		this.spawn();
		this.lastSpawned = 0;
	}
};

FoodSpawner.prototype.spawn = function () {
	//Randomize position for food
	var r = this.radius * Math.random();
	var angle = 2*Math.PI*Math.random();

	var x = this.x + r*Math.cos(angle);
	var y = this.y + r*Math.sin(angle);
	
	var food = new Food(this.world, x, y)
	this.world.foods.push(food);
}
*/