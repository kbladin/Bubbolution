//
// Stats Monitor
//

function StatsMonitor (world, parentElement) {
	this.world = world;
	this.monitorData = [];

	// Populate monitor data
	this.monitorData.push({
		label: "num updates", 
		getValue: function(){return world.numUpdates;}
	});
	this.monitorData.push({
		label: "num ants", 
		getValue: function(){return world.ants.length;}
	});
	this.monitorData.push({
		label: "num foods",
		getValue: function(){return world.sumGridValues(world.food); }
	});
	this.monitorData.push({
		label: "total home phermones", 
		getValue: function(){return world.sumGridValues(world.homePheromones).toFixed(2);}
	});
	this.monitorData.push({
		label: "total food phermones", 
		getValue: function(){return world.sumGridValues(world.foodPheromones).toFixed(2);}
	});
	
	this.initDomElements(parentElement);
};

StatsMonitor.prototype.initDomElements = function(parentElement){
	// Create Stats container
	var statsContainer = document.createElement('DIV');
	statsContainer.style.background = "white";
	statsContainer.style.position = "absolute";
	statsContainer.style.bottom = "0px";
	parentElement.appendChild(statsContainer);

	//Num agents
	var thisMonitor = this;
	this.monitorData.forEach(function(d){
		statsContainer.appendChild(thisMonitor.createValueMonitor(d.label));	
	});
}

StatsMonitor.prototype.createValueMonitor = function (label) {
	var p = document.createElement('P');
	p.style.margin= "0px";

	var labelSpan = document.createElement('SPAN');
	labelSpan.textContent = label + ": ";

	var valSpan = document.createElement('SPAN');
	valSpan.setAttribute("id", label);

	p.appendChild(labelSpan);
	p.appendChild(valSpan);

	return p;
}


StatsMonitor.prototype.start = function(monitorParams) {
	var thisMonitor = this;
	this.loop = setInterval(function() {
		thisMonitor.monitorData.forEach(function (d) {
			document.getElementById(d.label).textContent = d.getValue();
		});
		
	}, monitorParams.waitTime);
};

StatsMonitor.prototype.stop = function() {
	clearInterval(this.loop)
};
