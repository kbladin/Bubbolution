function Egg (world, antColony, x, y, angle) {
	this.world = world;
	this.antColony = antColony;

	this.age = 0;
	
    // Position and orientation
    this.x = x;
    this.y = y;
    this.angle = angle; // 0-7

    this.insideNest = true;
};

// STATIC CONSTANTS
Egg.prototype.STATIC = {
	HATCH_AGE: 1000,
};

Egg.prototype.update = function() {
	if (this.age >= this.STATIC.HATCH_AGE && Math.random() > 0.9) {
		this.hatch();
	}
	this.age++;
};

Egg.prototype.hatch = function() {
	var x = this.x;
	var y = this.y;
	var a = new Ant(this.world, this.antColony, x, y, this.angle);
	a.insideNest = true;
	this.world.ants.push(a);
	this.antColony.removeEgg(this);
};