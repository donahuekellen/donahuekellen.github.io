var w = 80, h = 300;
var key = d3.select("#scatter")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("transform", "translate(-50,-55)");
  

var legend = key.append("defs")
  .append("svg:linearGradient")
  .attr("id", "gradient")
  .attr("x1", "100%")
  .attr("y1", "0%")
  .attr("x2", "100%")
  .attr("y2", "100%")
  .attr("spreadMethod", "pad");

legend.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#FDE725FF")
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "33%")
  .attr("stop-color", "#5DC863FF")
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "66%")
  .attr("stop-color", "#21908CFF")
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#440145FF")
  .attr("stop-opacity", 1);

key.append("rect")
  .attr("width", w-30)
  .attr("height", h)
  .style("fill", "url(#gradient)")
  .attr("transform", "translate(0,0)");

var y = d3.scaleLinear()
  .range([300, 0])
  .domain([0, 6195]);

var yAxis = d3.axisRight()
  .scale(y)
  .ticks(4)
  .tickValues([1000,2000,3000,4000,5000,6000]);

key.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(0,0)")
  .call(yAxis)
  .append("text")
  .attr("y", 0)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  
  .attr("transform", "translate(-5,30)")
  .text("axis title");
  
  
  
 