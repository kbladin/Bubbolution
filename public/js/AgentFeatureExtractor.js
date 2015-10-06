Agent.prototype.extractFeatures = function(){

	//Extract features from this agent and the world
	
	var agent = this;
	var world = this.world;

	// The array of feature values to be returned
	var features = [];

	
	//Health indicators
	var healthThres1 = agent.constants.MAX_HEALTH * 0.33;
	var healthThres2 = agent.constants.MAX_HEALTH * 0.67;
	features.push(+(agent.health < healthThres1));
	features.push(+(healthThres1 < agent.health && agent.health <= healthThres2));
	features.push(+(healthThres2 < agent.health));

	// Fullness indicators
	var fullnessThres1 = agent.constants.MAX_FULLNESS * 0.33;
	var fullnessThres2 = agent.constants.MAX_FULLNESS * 0.67;
	features.push(+(agent.fullness < fullnessThres1));
	features.push(+(fullnessThres1 < agent.fullness && agent.fullness <= fullnessThres2));
	features.push(+(fullnessThres2 < agent.fullness));

	//Num near agents
	var radius = agent.constants.ATTENTION_RADIUS;
	var sorted = false;
	var nearbyAgents = world.getAgentsWithinRadius(agent, radius, sorted);
	features.push(+(nearbyAgents.length === 0));
	features.push(+(nearbyAgents.length >= 1));

	//Age
	features.push(+(agent.age > agent.constants.MAX_AGE * 0.67));
	features.push(+(agent.age < agent.constants.MAX_AGE * 0.33));
	

	/*
	// Helper function for creating indicator features
	function asIndicators(value, min, max, numIndicators){
		var indicators = [];
		var delta = (max-min)/numIndicators;
		var lower = min;
		var upper=min+delta;
		while(upper <= max){
			indicators.push(+(lower <= value && value <= upper));
			lower = upper;
			upper+= delta;
		}
		return indicators;
	}
	
	// Example
	asIndicators(agent.age, 0, agent.constants.MAX_AGE, 10).forEach(function(indicator){
		features.push(indicator)
	});
	*/
	return features;
};


