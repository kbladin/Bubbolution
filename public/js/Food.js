//
// Food
//

function Food (world, x,y) {
	this.world = world;
	this.id = Food.prototype.foodCount++;

    // Position and orientation
    this.x = x;
    this.y = y;
};

Food.prototype.foodCount = 0;
