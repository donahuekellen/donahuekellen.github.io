

// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1450,
    height = 800,
	tablewidth = 25,
	tableheight = 6;
	
// append the svg object to the body of the page
function range(start, end,inc) {
    if(start === end) return [start];
    return [start, ...range(start + inc, end,inc)];
}

function clicked(event){
    event.stopPropagation();
	
	zoom.transform(svg,d3.zoomIdentity);
}

function zoomed(event) {
	
    const {transform} = event;
	transform.x = Math.min(0, Math.max(transform.x, width - width * transform.k));
	transform.y = Math.min(0, Math.max(transform.y, height - height * transform.k));
    politics.attr("transform", transform);
    	politics.selectAll("path").attr("stroke-width",1/transform.k)
	borders.attr("transform", transform);
	borders.selectAll("path").attr("stroke-width",3/transform.k)
	ghosts.attr("transform", transform);
	ghosts.selectAll("circle")
		.attr("stroke-width",.1/transform.k+"%")
		.attr("r",.2/transform.k+"%");
  }
var zoom = d3.zoom()
  .scaleExtent([1, 15])
  .on("zoom", zoomed)

var svg = d3.select("#scatter").append("svg")
		.attr("width",width)
		.attr("height",height)
		.on("click",clicked)
		.call(zoom);

svg.append("rect")
    .attr("width", "150%")
    .attr("height", "100%")
    .attr("fill", "darkgrey");


var politics = svg.append("g");
var borders = svg.append("g");
var ghosts = svg.append("g");
var legend = politics.append("g");
var table = politics.append("g");

politics.append("text")
	.attr("transform", "translate(40,30)")
	.attr("font-size","125%")
	.attr("font-weight","bold")
	.attr("x","84%")
	.attr("y","95.5%")
    .text("*Continental US only");


table.attr("transform","translate(80,650)")

table.append("rect")
	.attr("width", "22%")
    .attr("height", "15%")
    .attr("fill", "white")
	.attr("stroke","black")

table.append("rect")
	.attr("width", "11%")
    .attr("height", "5%")
    .attr("fill", "transparent")
	.attr("stroke","black")

table.append("rect")
	.attr("width", "11%")
    .attr("height", "5%")
	.attr("y","5%")
    .attr("fill", "transparent")
	.attr("stroke","black")
	
table.append("rect")
	.attr("width", "11%")
    .attr("height", "5%")
	.attr("y","10%")
    .attr("fill", "transparent")
	.attr("stroke","black")

table.append("rect")
	.attr("width", "11%")
    .attr("height", "5%")
	.attr("x","11%")
    .attr("fill", "transparent")
	.attr("stroke","black")
	
table.append("rect")
	.attr("width", "11%")
    .attr("height", "5%")
	.attr("x","11%")
	.attr("y","5%")
    .attr("fill", "transparent")
	.attr("stroke","black")
	
table.append("rect")
	.attr("width", "11%")
    .attr("height", "5%")
	.attr("x","11%")
	.attr("y","10%")
    .attr("fill", "transparent")
	.attr("stroke","black")
	

table
    .append("text")
	.attr("x","3%")
	.attr("y","3.5%")
	.attr("font-size","200%")
	.attr("font-weight","bold")
    .text("Party");



table
    .append("text")
	.attr("x","11.5%")
	.attr("y","3.5%")
	.attr("font-size","200%")
	.attr("font-weight","bold")
    .text("Hauntings");
	

table
    .append("text")
	.attr("transform", "translate(5,70)")
	.attr("font-size","200%")
    .text("Republican");
	
table
    .append("text")
	.attr("transform", "translate(210,70)")
	.attr("font-size","200%")
    .text("5152");
	

table
    .append("text")
	.attr("transform", "translate(12,110)")
	.attr("font-size","200%")
    .text("Democrat");
	
table
    .append("text")
	.attr("transform", "translate(210,110)")
	.attr("font-size","200%")
    .text("4292");

legend.attr("transform","translate(1000,20)")

legend.append("rect")
	.attr("width", "13%")
    .attr("height", "14%")
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
	.attr("font-size","200%")
    .text("Haunting");
	
legend.append("path")
	.attr("d", d3.symbol().size(200).type(d3.symbolSquare)) 
	.attr("transform", "translate(20,55)")
    .style("fill", "red")
	.style("stroke", "black")

legend
    .append("text")
	.attr("transform", "translate(40,65)")
	.attr("font-size","200%")
    .text("Republican");
	
legend.append("path")
	.attr("d", d3.symbol().size(200).type(d3.symbolSquare)) 
	.attr("transform", "translate(20,95)")
    .style("fill", "blue")
	.style("stroke", "black")

legend
    .append("text")
	.attr("transform", "translate(40,105)")
	.attr("font-size","200%")
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
	.attr("stroke-width",1)
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
		

	

	ghosts.selectAll("dot")
        .data(ghost)
        .enter().append("circle")
		.attr("fill", "yellow")
		.attr("stroke", "black")
		.attr("stroke-width",".1%")
		.attr("r",".2%")
		.attr("cx",function(d){return projection([d.lon,d.lat])[0]})
		.attr("cy",function(d){return projection([d.lon,d.lat])[1]})
	// ghosts.selectAll("path")
        // .data(ghost)
        // .enter().append("circle")
		// .attr("fill", "yellow")
		// .attr("stroke", "black")
		// .attr("d",d3.symbol().size(10).type(d3.symbolSquare))
		// .attr("transform",function(d){return "translate("+projection([d.lon,d.lat])+")"})
	

})})})
