//
// AntQueen
//

function AntQueen (world, antColony, x, y, angle) {
	Ant.call(this, world, antColony, x, y, angle);
	this.insideNest = true;

	this.homePheromone = 0;
	this.foodPheromone = 0;
	this.homeSickTimer = 0;
}


AntQueen.prototype.act = function() {
	if(Math.random() > 0.9){
		if(this.antColony.food > this.world.antsInColony(this.antColony)){
			this.layEgg();
			this.wander();
		}
	}
	this.update();
};

AntQueen.prototype.update = function() {
	this.hunger += 1;
	this.age += 1;
	if(this.antColony.food > 0 && this.hunger > this.STATIC.HUNGER_PER_FOOD){
		this.hunger -= this.STATIC.HUNGER_PER_FOOD;
		this.antColony.food--;
	}
};

AntQueen.prototype.layEgg = function() {
	//Should lay an egg, but simple creates a new ant atm.
	this.antColony.food -= 10;
	var x = this.x;
	var y = this.y;
	var a = new Ant(this.world, this.antColony, x, y, this.angle);
	a.insideNest = true;
	this.world.ants.push(a);
};

Utils.extend(Ant, AntQueen);