
//
// Brain
//

function Brain (agent) {
	this.agent = agent;

	var numInputs = agent.extractFeatures().length;
	var numOutputs = agent.AVAILABLE_ACTIONS.length;
	this.network = new synaptic.Architect.Perceptron(numInputs, 10, numOutputs);
}

Brain.prototype.mutate = function(mutationRate) {
	// 1. Mutate body
	// 2. Mutate brain
};

Brain.prototype.mate = function(brainMate) {
    // Create a child
    
    // 1. Mutate body
	// 2. Mutate brain

    return child;
};

Brain.prototype.getAction = function () {
	var input = this.agent.extractFeatures();
	var output = this.network.activate(input);

	var indexBestAction = 0;
	var valueBestAction = output[0];
	for(var i=1; i<output.length; ++i){
		if(valueBestAction < output[i]){
			indexBestAction = i;
			valueBestAction = output[i];
		}
	}

	var bestAction = this.agent.AVAILABLE_ACTIONS[indexBestAction];

	return bestAction;
}