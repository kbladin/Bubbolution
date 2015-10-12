//
// AntQueen
//

function AntQueen (world, antColony, x, y, angle) {
	Ant.call(this, world, antColony, x, y, angle);
	this.insideNest = true;
}


AntQueen.prototype.act = function() {
	if(Math.random() > 0.99){
		if(this.antColony.food > 100){
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
	var a = new Ant(this.world, this.antColony, this.x, this.y, this.angle);
	a.insideNest = true;
	this.world.ants.push(a);
};

Utils.extend(Ant, AntQueen);