
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
		var lostInsideNest = this.ant.homeSickTimer >= this.ant.STATIC.MAX_INSIDE_HOMESICKNESS;
		if (this.ant.carryingDirt || lostInsideNest) {
			bestAction = "lookForExit";
		} else if (!this.ant.carryingDirt) {
			bestAction = "digNest";
		}
	} else 	if(!this.ant.insideNest){
		var lostOutsideNest = (this.ant.homeSickTimer >= this.ant.STATIC.MAX_OUTSIDE_HOMESICKNESS);
		if (this.ant.carryingFood || lostOutsideNest) {
			bestAction = "lookForHome";
		} else if (!this.ant.carryingFood) {
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
