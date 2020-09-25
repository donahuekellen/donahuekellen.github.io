
// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 477,
    height = 95;
function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1000, end)];
}
// append the svg object to the body of the page

var svg = d3.select("#scatter").append("svg")
	 .attr("viewBox","0 0 "+width+" "+height);

var g1 = svg.append("g")
var g2 = svg.append("g")

g1.append("rect")
    .attr("width", "100%")
    .attr("height", "90%")
    .attr("fill", "#F0F0F0");



	
var legendRectE = svg.append("g")
    .attr("transform", "translate(0,0)")
	
legendRectE.append("rect")
	.attr("width", "30")
    .attr("height", "10")
    .attr("fill", "white")
    .attr("transform", "translate(60,60)");
	
legendRectE.append("path")
	.attr("d", d3.symbol().size(10).type(d3.symbolDiamond)) 
    .style("fill", "red")
	.attr("transform", "translate(65,65)");

legendRectE
    .append("text")
	.attr("transform", "translate(70,67)")
    .text("= City");

var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateViridis);



var transform = d3.geoIdentity().scale(.9);	
d3.json("cities.json").then(function(cities){

	var thresholds = range(1000,200000);
	var merged = [].concat.apply([], cities);
	
	
  var contours = d3.contours()
    .size([width,height])
    .thresholds(thresholds)
	.smooth(true)
	(merged)

	g2.selectAll("path")
        .data(contours)
        .enter().append("path")
		.attr("fill", "red")
		.attr("stroke","red")
		.attr("stroke-width",.5)
		.attr("d", d3.geoPath().projection(transform))

})
d3.json("data2.json").then(function(data){
var dataset = 0

	var merged = [].concat.apply([], data);
	
	
	
	var thresholds = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1]
	
  var contours = d3.contours()
    .size([width,height])
    .thresholds(thresholds)
	.smooth(true)
	(merged)

	g1.selectAll("path")
        .data(contours)
        .enter().append("path")
		.attr("fill", function(d){
				temp = d.value
				return colorScale(temp)
		})
		.attr("d", d3.geoPath().projection(transform))

	
	
})

