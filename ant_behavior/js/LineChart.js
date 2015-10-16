function LineChart(containerId, width, height, bufSize, monitorData){
  this.w = width;
  this.h = height;
  this.margin = {top: 10, right: 10, bottom: 10, left: 10};

  this.bufferPointer = 0;
  this.bufferSize = bufSize || 100;

  this.dataBuffers = {};
  for (var i = 0; i < monitorData.length; i++) {
    this.dataBuffers[monitorData[i].label] = new CircularBuffer(this.bufferSize, 0);
  };

  this.xAxis = 'Time steps';

  this.graph = d3.select('#'+containerId).append("svg:svg").attr("width", "100%").attr("height", "100%");

  this.x = d3.scale.linear().domain([0, 100000]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition

  
  //this.draw('#'+containerId, width, height, 'basis', false, 1000, 1000);
}



LineChart.prototype.pushData = function(data) {
  this.dataBuffers[data.label].set(this.bufferPointer, data.getValue());
};

LineChart.prototype.redraw = function() {

  var thisLineChart = this;
  var y = d3.scale.linear().domain([0, 1]).range([0, this.h]);
  var xBuffer = thisLineChart.dataBuffers[thisLineChart.xAxis];

  var maxX = xBuffer.asArray().reduce(function(a,b){return Math.max(a,b);}, 0);

  this.graph.selectAll("*").remove();
  for (var property in this.dataBuffers) {
    if (this.dataBuffers.hasOwnProperty(property)) {
      if(property == this.xAxis || property !== 'Colony size'){
        continue;
      }

      var label = property;
      var data = this.dataBuffers[label].asArray();
      //console.log(label, data);

      var maxY = data.reduce(function(a,b){return Math.max(a,b);}, 0);
      var oneOverMaxY = maxY ? 1 / maxY : 0;



      // create a line object that represents the SVN line we're creating
      var line = d3.svg.line()

        // assign the X function to plot our line as we wish
        .x(function(d,i) { 
          // verbose logging to show what's actually being done
          //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + xBuffer.get(thisLineChart.bufferPointer + i) + ' using our xScale.');
          // return the X coordinate where we want to plot this datapoint

          return thisLineChart.x(xBuffer.asArray()[i] - maxX) + thisLineChart.w;
        })
        .y(function(d) { 
          // verbose logging to show what's actually being done
          //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) * oneOverMaxY + " using our yScale.");
          // return the Y coordinate where we want to plot this datapoint
          return thisLineChart.h - y(d) * oneOverMaxY;
        })
        .interpolate('linear');

      // display the line by appending an svg:path element with the data line we created above

      this.graph.append("svg:path").attr("d", line(data));

      this.graph.selectAll("path")
        .data([data]) // set the new data
        .attr("d", line); // apply the new data values
    }
  }

  this.bufferPointer++;
};

LineChart.prototype.draw = function(id, width, height, interpolation, animate, updateDelay, transitionDelay) {
  // create an SVG element inside the #graph div that fills 100% of the div
  var graph = d3.select(id).append("svg:svg").attr("width", "100%").attr("height", "100%");

  // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
  var data = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25];


  // X scale will fit values from 0-10 within pixels 0-100
  var x = d3.scale.linear().domain([0, 48]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition

  // Y scale will fit values from 0-10 within pixels 0-100
  var y = d3.scale.linear().domain([0, 1]).range([0, height]);
  var yMax = data.reduce(function(a,b){return Math.max(a,b);}, 0);
  var oneOverMaxY = yMax ? 1 / yMax : 0;


  var self = this;
  // create a line object that represents the SVN line we're creating
  var line = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d,i) { 
      // verbose logging to show what's actually being done
      //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
      // return the X coordinate where we want to plot this datapoint
      return x(i);
    })
    .y(function(d) { 
      // verbose logging to show what's actually being done
      //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
      // return the Y coordinate where we want to plot this datapoint
      return self.h - y(d) * oneOverMaxY;
    })
    .interpolate(interpolation)

    // display the line by appending an svg:path element with the data line we created above

    graph.append("svg:path").attr("d", line(data));
    // or it can be done like this
    //graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);
    
    
  
  
  function redrawWithoutAnimation() {
    // static update without animation
    graph.selectAll("path")
      .data([data]) // set the new data
      .attr("d", line); // apply the new data values
  }
  
  setInterval(function() {
    var v = data.shift(); // remove the first element of the array
    data.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end) 
    redrawWithoutAnimation();
  }, updateDelay);
};

/*LineChart.prototype.draw = function() {
  var width = this.w - this.margin.left - this.margin.right;
  var height = this.h - this.margin.top - this.margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });


  var svg = this.svg;

  svg.attr("width", width + this.margin.left + this.margin.right)
    .attr("height", height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


  for (var i = 0; i < this.bufferSize; i++) {
    
    var dataCol = this.buffer.get(this.bufferPointer + i);
    if(dataCol === undefined) {
      continue;
    }

    var xData = dataCol[0];
    for (var j = 0; j < dataCol.length; j++) {
      var data = dataCol[j];
      x.domain(d3.extent(data, function(d) { return xData.getValue(); }));
      y.domain(d3.extent(data, function(d) { return d.getValue(); }));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("y");

      svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);      
    };
  };
};*/

function displayGraphExample(id, width, height, interpolation, animate, updateDelay, transitionDelay) {
  // create an SVG element inside the #graph div that fills 100% of the div
  var graph = d3.select(id).append("svg:svg").attr("width", "100%").attr("height", "100%");

  // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
  var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];

  // X scale will fit values from 0-10 within pixels 0-100
  var x = d3.scale.linear().domain([0, 48]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
  // Y scale will fit values from 0-10 within pixels 0-100
  var y = d3.scale.linear().domain([0, 10]).range([0, height]);

  // create a line object that represents the SVN line we're creating
  var line = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d,i) { 
      // verbose logging to show what's actually being done
      //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
      // return the X coordinate where we want to plot this datapoint
      return x(i); 
    })
    .y(function(d) { 
      // verbose logging to show what's actually being done
      //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
      // return the Y coordinate where we want to plot this datapoint
      return y(d); 
    })
    .interpolate(interpolation)

    // display the line by appending an svg:path element with the data line we created above
    graph.append("svg:path").attr("d", line(data));
    // or it can be done like this
    //graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);
    
    
  function redrawWithAnimation() {
    // update with animation
    graph.selectAll("path")
      .data([data]) // set the new data
      .attr("transform", "translate(" + x(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
      .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
      .transition() // start a transition to bring the new value into view
      .ease("linear")
      .duration(transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
      .attr("transform", "translate(" + x(0) + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value
      
      /* thanks to 'barrym' for examples of transform: https://gist.github.com/1137131 */
  }
  
  function redrawWithoutAnimation() {
    // static update without animation
    graph.selectAll("path")
      .data([data]) // set the new data
      .attr("d", line); // apply the new data values
  }
  
  setInterval(function() {
     var v = data.shift(); // remove the first element of the array
     data.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
     if(animate) {
       redrawWithAnimation();
     } else {
         redrawWithoutAnimation();
     }
  }, updateDelay);
}

