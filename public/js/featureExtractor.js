function extractFeature(agent){
	var features = [];

	//Carma indicators
	features.push(agent.carma === 0);
	features.push(0 < agent.carma && agent.carma <= 10);
	features.push(10 < agent.carma && agent.carma <= 100);
	
}
