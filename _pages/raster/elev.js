
// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 477,
    height = 95;
	
d3.select("#scatter2").style("transform",'translate(0,-378px)');
// append the svg object to the body of the page

// var canvas = d3.select("#scatter").append("canvas")
    // .attr("width", width )
     // .attr("height", height)

var svg2 = d3.select("#scatter2").append("svg")
	 .attr("viewBox","0 0 "+width+" "+height)
     .append("g");

// const context = d3.select("canvas").node().getContext('2d');
var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateViridis);
  
 var colorcity = d3.scaleSequential()
 .domain([2,20000,40000,60000,80000,100000])

// read data
var zoomed = false;
	// svg.on("click",function(){
			// if (zoomed){
				// d3.selectAll("svg").attr("viewBox","0 0 1376 585");
				// zoomed = false;
			// }
			// else{
			// var x = event.clientX;
			// var y = event.clientY;
			// console.log(x,y,"   "+ (x)+" "+(y)+" "+(100)+" "+(100))
			// d3.selectAll("svg").attr("viewBox", (x)+" "+(y)+" "+(100)+" "+(100));
			// zoomed = true;
			// }
		// })	
// var canvas = d3.select("#scatter2").append("canvas")
    // .attr("width", width )
     // .attr("height", height)


// var context = d3.select("canvas").node().getContext('2d');



d3.json("cities2.json").then(function(data){
	
function dataload(data,i){
	  // Add X axis
	var merged = [].concat.apply([], data);
	
	
	
	var thresholds = [2,20000,40000,60000,80000,100000];
	
  var contours = d3.contours()
    .size([width,height])
    .thresholds(thresholds)
	.smooth(true)
	(merged)
	
	var transform = d3.geoIdentity().scale(.9);
  // compute the density data
	svg2.selectAll("path")
        .data(contours)
        .enter().append("path")
		.attr("fill", function(d){
				temp = +d.value
				if (temp>1){
				return colorcity(temp);
				}
				else{
				return "rgba(0,255,0,0.5)";
				}
		})
		// .attr("opacity",".8")
		.attr("d", d3.geoPath().projection(transform))

	
  // Add the contour: several "path"
	
console.log("done");
}

dataload(data,0)
})

/*d3.json("cities.json").then(function(data){
	console.log(data)
	projection= d3.geoIdentity().scale(2)
	data.forEach(function(d){
		d.population = +d.population
		d.lng = -d.lng
		d.lat = +d.lat
		d.total = d.population
		console.log(d.lng)
		console.log(projection([d.lng,d.lat]))
		var x2 = projection([d.lng,d.lat])[0];
		var y2 = projection([d.lng,d.lat])[1];
		console.log(x2)
		var symbol = d3.symbol()
				.type(d3.symbolSquare)
				.size(5)
				.context(context);
		context.translate(x2,y2);
		context.fillStyle = "red";
		context.beginPath();
		symbol();
		context.closePath();
		context.fill();
		context.translate(-x2, -y2);
})})
*/


