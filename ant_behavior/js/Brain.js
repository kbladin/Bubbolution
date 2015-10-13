
//
// Brain
//

function Brain (ant) {
	this.ant = ant;
}

Brain.prototype.getAction = function () {
	// Decision tree
	var bestAction;
	if(this.ant.insideNest){
		var lostInsideNest = this.ant.lostInsideNest(); //this.ant.homeSickTimer >= this.ant.STATIC.MAX_INSIDE_HOMESICKNESS;
		if (this.ant.carryingDirt || lostInsideNest) {
			bestAction = "lookForExit";
		} else if (!this.ant.carryingDirt) {
			bestAction = "digNest";
		}
	} else 	if(!this.ant.insideNest){
		var lostOutsideNest = this.ant.lostOutsideNest();//!this.ant.world.homePheromones[this.ant.x][this.ant.y] || this.ant.homePheromone <= 0;//(this.ant.homeSickTimer >= this.ant.STATIC.MAX_OUTSIDE_HOMESICKNESS);
		var needFood = this.ant.hunger > 0.8 * this.ant.STATIC.MAX_HUNGER;
		if (this.ant.carryingFood || lostOutsideNest || needFood) {
			bestAction = "lookForHome";
		} else if(this.ant.carryingDirt) {
			bestAction = "buildAntHill";
		}
		else if (!this.ant.carryingFood) {
			bestAction = "lookForFood";
		}
	}

/*
	if(this.ant.carryingBuildMaterial){
		bestAction = "lookForHome";
	}
	else if (!this.ant.carryingFood) {
		bestAction = "lookForFood";
	}
	else {
		bestAction = "lookForHome";
	}
	bestAction = "digNest";*/
	return bestAction;
}
