Agent.prototype.extractFeatures = function(){

	//Extract features from this agent and the world
	var agent = this;
	var world = this.world;

	// The array of feature values to be returned
	var features = [];

	//Health indicators
	features.push(+(agent.health === 0));
	features.push(+(0 < agent.health && agent.health <= 10));
	features.push(+(10 < agent.health && agent.health <= 100));

	//Num near agents
	var radius = agent.constants.ATTENTION_RADIUS;
	var sorted = false;
	var nearbyAgents = world.getAgentsWithinRadius(agent, radius, sorted);
	features.push(nearbyAgents.length);
	
	return features;
}
