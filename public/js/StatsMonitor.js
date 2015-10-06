//
// Stats Monitor
//

function StatsMonitor (world, parentElement) {
	this.world = world;
	this.monitorData = [];

	// Populate monitor data
	this.monitorData.push({
		label: "num agents", 
		getValue: function(){return world.agents.length;}
	});
	this.monitorData.push({
		label: "num foods",
		getValue: function(){return world.foods.length;}
	});
	this.monitorData.push({
		label: "num updates", 
		getValue: function(){return world.numUpdates;}
	});
	this.monitorData.push({
		label: "num born agents", 
		getValue: function(){return world.numBornAgents;}
	});
	this.monitorData.push({
		label: "num dead agents", 
		getValue: function(){return world.numDeadAgents;}
	});
	this.monitorData.push({
		label: "num food spawners",
		getValue: function(){return world.foodSpawners.length;}
	})
	
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
