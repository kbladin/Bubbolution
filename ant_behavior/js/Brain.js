
//
// Brain
//

function Brain (ant) {
	this.ant = ant;
}

Brain.prototype.getAction = function () {
	var bestAction;
	if(this.ant.carryingBuildMaterial){
		bestAction = "lookForHome";
	}
	else if (!this.ant.carryingFood) {
		bestAction = "lookForFood";
	}
	else {
		bestAction = "lookForHome";
	}
	bestAction = "digNest";
	return bestAction;
}
