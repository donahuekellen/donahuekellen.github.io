

// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1450,
    height = 800;
	
// append the svg object to the body of the page
function range(start, end,inc) {
    if(start === end) return [start];
    return [start, ...range(start + inc, end,inc)];
}



//based on the invert function from https://observablehq.com/@d3/geotiff-contours-ii

var svg = d3.select("#scatter").append("svg")
		.attr("width",width)
		.attr("height",height)

svg.append("rect")
    .attr("width", "150%")
    .attr("height", "100%")
    .attr("fill", "darkgrey");

svg.append("text")
	.attr("transform", "translate(40,30)")
	.attr("font-size",20)
	.attr("font-weight","bold")
	.attr("x","84%")
	.attr("y","95.5%")
    .text("*Continental US only");
var politics = svg.append("g");
var borders = svg.append("g");
var ghosts = svg.append("g");
var legend = svg.append("g");
var table = svg.append("g");


table.attr("transform","translate(80,650)")

table.append("rect")
	.attr("width", "320")
    .attr("height", "120")
    .attr("fill", "white")
	.attr("stroke","black")

table.append("rect")
	.attr("width", "160")
    .attr("height", "40")
    .attr("fill", "transparent")
	.attr("stroke","black")

table.append("rect")
	.attr("width", "160")
    .attr("height", "40")
	.attr("transform", "translate(0,40)")
    .attr("fill", "transparent")
	.attr("stroke","black")
	
table.append("rect")
	.attr("width", "160")
    .attr("height", "40")
	.attr("transform", "translate(0,80)")
    .attr("fill", "transparent")
	.attr("stroke","black")

table.append("rect")
	.attr("width", "160")
    .attr("height", "40")
	.attr("transform", "translate(160,0)")
    .attr("fill", "transparent")
	.attr("stroke","black")
	
table.append("rect")
	.attr("width", "160")
    .attr("height", "40")
	.attr("transform", "translate(160,40)")
    .attr("fill", "transparent")
	.attr("stroke","black")
	
table.append("rect")
	.attr("width", "160")
    .attr("height", "40")
	.attr("transform", "translate(160,80)")
    .attr("fill", "transparent")
	.attr("stroke","black")
	

table
    .append("text")
	.attr("transform", "translate(40,30)")
	.attr("font-size",33)
	.attr("font-weight","bold")
    .text("Party");

table
    .append("text")
	.attr("transform", "translate(165,30)")
	.attr("font-size",33)
	.attr("font-weight","bold")
    .text("Hauntings");
	

table
    .append("text")
	.attr("transform", "translate(5,70)")
	.attr("font-size",33)
    .text("Republican");
	
table
    .append("text")
	.attr("transform", "translate(210,70)")
	.attr("font-size",33)
    .text("5152");
	

table
    .append("text")
	.attr("transform", "translate(12,110)")
	.attr("font-size",33)
    .text("Democrat");
	
table
    .append("text")
	.attr("transform", "translate(210,110)")
	.attr("font-size",33)
    .text("4292");

legend.attr("transform","translate(1050,20)")

legend.append("rect")
	.attr("width", "180")
    .attr("height", "110")
    .attr("fill", "white")
	.attr("stroke","black")
	
legend.append("path")
	.attr("d", d3.symbol().size(300).type(d3.symbolCircle)) 
	.attr("transform", "translate(20,15)")
    .style("fill", "yellow")
	.style("stroke", "black")
legend
    .append("text")
	.attr("transform", "translate(40,25)")
	.attr("font-size",30)
    .text("Haunting");
	
legend.append("path")
	.attr("d", d3.symbol().size(200).type(d3.symbolSquare)) 
	.attr("transform", "translate(20,55)")
    .style("fill", "red")
	.style("stroke", "black")

legend
    .append("text")
	.attr("transform", "translate(40,65)")
	.attr("font-size",30)
    .text("Republican");
	
legend.append("path")
	.attr("d", d3.symbol().size(200).type(d3.symbolSquare)) 
	.attr("transform", "translate(20,95)")
    .style("fill", "blue")
	.style("stroke", "black")

legend
    .append("text")
	.attr("transform", "translate(40,105)")
	.attr("font-size",30)
    .text("Democrat");

var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateViridis);
  
 var colorcity = d3.scaleSequential()
 .interpolator(d3.interpolatePuRd)
 
d3.json("usa.geojson").then(function(border){
d3.json("politics.geojson").then(function(politic){
d3.csv("haunted_places.csv").then(function(ghost){
	
	
	
	ghost.forEach(
	function (d) {
			
			d.lon = +d.longitude;
			d.lat = +d.latitude;
	});
	
	
	var projection = d3.geoAlbers().fitSize([width,height],border);
	thresholds = thresholds = range(100,260,10);
	
	
	path = d3.geoPath(projection).pointRadius(1)
	var transform = d3.geoIdentity().scale(1);
  // compute the density data
	
			
	politics.selectAll("path")
	.data(politic.features)
	.enter().append("path")
	
	.attr("stroke", "black")
	.attr("fill",function(d){
		if (d.properties.party == 1){
			return 'red'
		}
		return "blue"
	})
	.attr("d", d3.geoPath(projection));	
		
		
		
	
		
		
	borders.selectAll("path")
	.data(border.features)
	.enter().append("path")
	.attr("stroke","black")
	.attr("stroke-width",3)
	.attr("fill","transparent")
	.attr("d", d3.geoPath(projection));
		

			
	ghosts.selectAll("path")
        .data(ghost)
        .enter().append("path")
		.attr("fill", "yellow")
		.attr("stroke", "black")
		.attr("d",d3.symbol().size(10).type(d3.symbolSquare))
		.attr("transform",function(d){return "translate("+projection([d.lon,d.lat])+")"})
	

})})})