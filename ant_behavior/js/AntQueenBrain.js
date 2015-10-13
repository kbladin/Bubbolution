
//
// AntQueenBrain
//

function AntQueenBrain (ant) {
	this.ant = ant;
}

AntQueenBrain.prototype.getAction = function () {
	// Decision tree
	var bestAction;
	if(this.ant.insideNest){
		var lostInsideNest = this.ant.homeSickTimer >= this.ant.STATIC.MAX_INSIDE_HOMESICKNESS;
		if (lostInsideNest) {
			bestAction = "lookForExit"; // Just go to entrance but do not exit
		} else {
			bestAction = "layEggs";
		}
	} else {
		bestAction = "lookForHome"; // Always look for home
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
