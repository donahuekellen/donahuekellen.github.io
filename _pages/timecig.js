/*data = [{
     date: 2009,
     wage: 7.25
}, {
     date: 2008,
     wage: 6.55
}, {
     date: 2007,
     wage: 5.85
}, {
     date: 1997,
     wage: 5.15
}, {
     date: 1996,
     wage: 4.75
}, {
     date: 1991,
     wage: 4.25
}, {
     date: 1981,
     wage: 3.35
}, {
     date: 1980,
     wage: 3.10
}, {
     date: 1979,
     wage: 2.90
}, {
     date: 1978,
     wage: 2.65
}]*/


	



d3.csv("alcohol-consumption-per-person-us.csv").then( function(data2) {
d3.csv("number-of-cigarettes-smoked-per-smoker-per-day.csv").then( function(data) {
	var margin = {top:20,right:20,bottom:30,left:60}

width = 700 - margin.left - margin.right;
height = 400 - margin.top - margin.bottom;
//format data
data2 = data2.filter(function(d){
		if(+d.Year < 1995){
			return false;
		}
		if(+d.Year > 2013){
			return false;
		}
		return true;
});

data = data.filter(function(d){
		if(+d.Year < 1995){
			return false;
		}
		if(+d.Year > 2013){
			return false;
		}
		return true;
});
data2.forEach(
	function (d) {
			parseDate = d3.timeParse("%Y");
			d.date = parseDate(d.Year);
			d.Spirits = +d.Spirits
			d.Wine = +d.Wine
			d.Beer = +d.Beer
			d.total = d.Spirits+d.Wine+d.Beer;
	}
);

data.forEach(
	function (d) {
			parseDate = d3.timeParse("%Y");
			d.date = parseDate(d.Year);
			d.Male = +d.Male
			d.Female = +d.Female
			d.total = (d.Male+d.Female)/2;
	}
);
//sort data by date
data.sort(
	function (a,b) {
		return a.date - b.date;
	}
);

data2.sort(
	function (a,b) {
		return a.date - b.date;
	}
);

data.forEach(function(d){
			var alctotal = data2.filter(function(d2) {
				return d2.Year === d.Year;
			});
			//console.log(alctotal[0].total);
			d.Spirits = alctotal[0].Spirits
			d.Wine = alctotal[0].Wine
			d.Beer = alctotal[0].Beer
			d.totala = alctotal[0].total;
});

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
// Scale the range of the data
x.domain(d3.extent(data, function (d) {
     return d.date;
}));
y.domain([Math.floor(d3.min(data, function (d) {return d.total;})), Math.ceil(d3.max(data, function (d) {return d.total;}))]);


var valueline = d3.line()
     .x(function (d) {
          return x(d.date);
     })
     .y(function (d) {
          return y(d.total);
     });

var svg = d3.select("#scatter3").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("path")
     .data([data])
     .attr("class", "line")
     .attr("d", valueline)
     //styling:
     .attr("stroke", "#089935")
     .attr("stroke-width", 2)
     .attr("fill", "#FFFFFF");

var path = svg.selectAll("dot")
     .data(data)
     .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function (d) {
           return x(d.date);
     })
     .attr("cy", function (d) {
          return y(d.total);
     })
     .attr("stroke", "#0000ff")
     .attr("stroke-width", 1.5)
     .attr("fill", "#0000FF")
	 .on("mouseenter", onenter)
	 .on("mouseleave", onexit);

	 
// Scale the range of the data



svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));
svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.bottom) + ")")
      .style("text-anchor", "middle")
      .text("Date");
	  
svg.append("g")
     .call(d3.axisLeft(y).tickFormat(function (d) {
          return d3.format(".2f")(d)
     }));
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Average Daily Cigarettes smoked Per Smoker");   


});
});