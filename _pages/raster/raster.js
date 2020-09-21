
// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 477,
    height = 95;
function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 5, end)];
}
// append the svg object to the body of the page

// var canvas = d3.select("#scatter").append("canvas")
    // .attr("width", width )
     // .attr("height", height)
var svg = d3.select("#scatter").append("svg")
	 .attr("viewBox","0 0 "+width+" "+height)
     .append("g");
	 
svg.append("rect")
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
    .style("fill", "black")
	.attr("transform", "translate(65,65)");

legendRectE
    .append("text")
	.attr("transform", "translate(70,67)")
    .text("= City");

// const context = d3.select("canvas").node().getContext('2d');
var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateViridis);

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
d3.json("data2.json").then(function(data){
var dataset = 0
// svg.on("mouseover",function(){
	// var x = event.clientX;
	// var y = event.clientY;
	// console.log(x,y);
	// svg.selectAll("dot")
			// .enter().append("dot")
			// .attr("fill","red")
			// .attr("d",d3.symbol().type(d3.symbolTriangle))
			 // .attr("cx", function (d) {
				   // return event.clientX;
			 // })
			 // .attr("cy", function (d) {
				  // return event.clientY;
			 // })
	// // d3.select("path#A"+dataset).attr("visibility","hidden");
	// // if (dataset==0){
	// // dataset=1
	// // d3.selectAll("path#A"+dataset).attr("visibility","visible");
	// // }else{
	// // dataset=0		
	// // d3.selectAll("path#A"+dataset).attr("visibility","visible");
	// // }
 // })
 

function dataload(data,i){
	  // Add X axis
	var merged = [].concat.apply([], data);
	
	
	
	var thresholds = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1]//range(180,300);
	
  var contours = d3.contours()
    .size([width,height])
    .thresholds(thresholds)
	.smooth(false)
	(merged)
	
	var transform = d3.geoIdentity().scale(.9);
  // compute the density data
	svg.selectAll("path")
        .data(contours)
        .enter().append("path")
		.attr("id","p1")
		.attr("fill", function(d){
				temp = d.value//(-180+d.value)/(300-180)
				return colorScale(temp)
		})
		.attr("d", d3.geoPath().projection(transform))

	
  // Add the contour: several "path"
	
}

dataload(data,0)
})
svg.selectAll("path").sort(function (a, b) { // select the parent and sort the path's
      if (a.id != d.id) return -1;               // a is not the hovered element, send "a" to the back
      else return 1;                             // a is the hovered element, bring "a" to the front
  });
