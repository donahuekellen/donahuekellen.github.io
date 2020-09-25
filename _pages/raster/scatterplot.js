
d3.csv("caakpop.csv").then(function(data){
	var margin = {top:20,right:50,bottom:50,left:40}
d3.select("#scatter3").style("transform",'translate(0,-430)');
width2 = 1080 - margin.left - margin.right;
height2 = 500 - margin.top - margin.bottom;
//format data
mi = 0
ma = 1661

data.forEach(
	function (d) {
			
			d.population = +d.population;
			d.elev = +d.elev*(ma-mi);
	});
//sort data by date
data.sort(
	function (a,b) {
		return a.elev - b.elev;
	}
);



var x = d3.scaleLinear().range([0, width2]);
var y = d3.scaleLog().range([height2, 0]);
// Scale the range of the data
x.domain(d3.extent(data, function (d) {
     return d.elev;
}));
y.domain([Math.floor(d3.min(data, function (d) {return d.population;})), Math.ceil(d3.max(data, function (d) {return d.population;}))]);



var svg3 = d3.select("#scatter3").append("svg")
     .attr("width", width2 + 10 + margin.left + margin.right)
     .attr("height", height2 + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	 


	 
// Scale the range of the data




var path = svg3.selectAll("dot")
     .data(data)
     .enter().append("circle")
     .attr("r", 2)
     .attr("cx", function (d) {
           return x(d.elev);
     })
     .attr("cy", function (d) {
          return y(d.population);
     })
     .attr("stroke", "#0000ff")
     .attr("stroke-width2", 1.5)
     .attr("fill", "#0000FF")
	 .attr("transform", "translate(40,0)")

svg3.append("g")
     .attr("transform", "translate(40," + height2 + ")")
     .call(d3.axisBottom(x));

svg3.append("text")             
      .attr("transform",
            "translate(" + (width2/2) + " ," + 
                           (height2-5 + margin.bottom) + ")")
      .style("text-anchor", "middle")
      .text("City Elevation (meters above sea level)");
	  
svg3.append("g")
	 .attr("transform", "translate(40,0)")
     .call(d3.axisLeft(y).ticks(5).tickValues([30,1000,33000,1050000]).tickFormat(function (d) {
          return d3.format("d")(d)
     }));
svg3.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height2 / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("City Population (Log scale)")
  .style("font-size",'12')
  .append("tspan")
  .text("2")
  .style("font-size",'1rem')
  .attr('dx', '-63')
  .attr('dy', '.5em')
	});
