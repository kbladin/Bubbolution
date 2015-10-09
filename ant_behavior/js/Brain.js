
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
		if (this.ant.carryingDirt || this.ant.lostInsideNest) {
			bestAction = "lookForExit";
		} else if (!this.ant.carryingDirt) {
			bestAction = "digNest";
		}
	} else 	if(!this.ant.insideNest){
		if (this.ant.carryingFood) {
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
