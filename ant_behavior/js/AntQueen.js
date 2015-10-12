//
// AntQueen
//

function AntQueen (world, antColony, x, y, angle) {
	Ant.call(this, world, antColony, x, y, angle);
	this.insideNest = true;
}


AntQueen.prototype.act = function() {
	if(Math.random() > 0.99){
		if(this.antColony.food > 500){
			this.layEgg();
		}
		this.wander();
	}
	this.update();
};

AntQueen.prototype.update = function() {
	this.hunger += 0.5;
	this.age += 0.5;
};

AntQueen.prototype.layEgg = function() {
	//Should lay an egg, but simple creates a new ant atm.
	var a = new Ant(this.world, this.antColony, this.x, this.y, this.angle);
	this.world.ants.push(a);
};

Utils.extend(Ant, AntQueen);