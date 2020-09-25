
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 477,
    height = 95;
    
var svg = d3.select("#scatter").append("svg")
	 .attr("viewBox","0 0 "+width+" "+height)
     .append("g");
var svg = d3.select("#scatter").selectAll("svg").append("g");
	
//d3.select("#scatter2").style("transform",'translate(0,-378px)');
// append the svg object to the body of the page


// const context = d3.select("canvas").node().getContext('2d');
var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateViridis);
  
 var colorcity = d3.scaleSequential()
 .domain([2,20000,40000,60000,80000,100000])

// read data
var zoomed = false;



d3.json("cities2.json").then(function(data){

	  // Add X axis
	/*var merged = [].concat.apply([], data);
	
	
	
	var thresholds = [2,20000,40000,60000,80000,100000];
	
  var contours = d3.contours()
    .size([width,height])
    .thresholds(thresholds)
	.smooth(true)
	(merged)
	var transform = d3.geoIdentity().scale(.9);
	

  // compute the density data
	svg.selectAll("path")
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
		.attr("d", d3.geoPath().projection(transform)).raise()
	

	
  // Add the contour: several "path"*/
	
console.log("done");

})

svg.raise()

