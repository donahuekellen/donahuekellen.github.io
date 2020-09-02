const tooltip = d3.select("#tooltip")
tooltip.style("transform",'translate(700px,320px)');
function onenter(data){
	var date = this.__data__.Year;
    d3.selectAll("circle").style('opacity', 0.5);
    d3.selectAll("circle")
          .filter(function(f) {
                return f.Year === date;
            })
		  .style('opacity', 1)
		  .style('stroke','#FF0000')
		  .style('fill','#FF0000');
	tooltip.style("opacity", 1)
    tooltip.select("#year").text(this.__data__.Year)
    tooltip.select("#alcohol").text(d3.format(".2f")(this.__data__.totala))
	tooltip.select("#spirits").text(d3.format(".2f")(this.__data__.Spirits))
	tooltip.select("#wine").text(d3.format(".2f")(this.__data__.Wine))
	tooltip.select("#beer").text(d3.format(".2f")(this.__data__.Beer))
    tooltip.select("#cigarettes").text(d3.format(".2f")(this.__data__.total))
	tooltip.select("#male").text(d3.format(".2f")(this.__data__.Male))
	tooltip.select("#female").text(d3.format(".2f")(this.__data__.Female))
};

function onexit(data){
	d3.selectAll("circle").style('opacity', 1)
		  .style('stroke','#0000FF')
		  .style('fill','#0000FF');
    tooltip.select("#year").text(" ")
    tooltip.select("#alcohol").text("")
	tooltip.select("#spirits").text("")
	tooltip.select("#wine").text("")
	tooltip.select("#beer").text("")
    tooltip.select("#cigarettes").text("")
	tooltip.select("#male").text("")
	tooltip.select("#female").text("")
	//tooltip.style("opacity", 0)
	
	
};
d3.csv("https://raw.githubusercontent.com/donahuekellen/donahuekellen.github.io/master/_data/alcohol-consumption-per-person-us.csv").then( function(data2) {
d3.csv("https://raw.githubusercontent.com/donahuekellen/donahuekellen.github.io/master/_data/number-of-cigarettes-smoked-per-smoker-per-day.csv").then( function(data) {
var margin = {top:20,right:20,bottom:40,left:60}

width = 1000 - margin.left - margin.right;
height = 800 - margin.top - margin.bottom;
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



var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
// Scale the range of the data
x.domain([Math.floor(10*d3.min(data, function (d) {return d.totala;}))/10, Math.ceil(10*d3.max(data, function (d) {return d.totala;}))/10]);
y.domain([Math.floor(d3.min(data, function (d) {return d.total;})), Math.ceil(d3.max(data, function (d) {return d.total;}))]);
var valueline = d3.line()
     .x(function (d) {
          return x(d.totala);
     })
     .y(function (d) {
          return y(d.total);
     });
	 
var fitline = d3.line()
     .x(function (d) {
          return x(d.totala);
     })
     .y(function (d) {
          return y(-5.8722333*d.totala+66.72713455);
     });

var svg = d3.select("#scatter").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




svg.append("path")
     .data([data])
     .attr("class", "line")
     .attr("d", fitline)
     //styling:
     .attr("stroke", "#089935")
     .attr("stroke-width", 2)
     .attr("fill", "#FFFFFF");

var path = svg.selectAll("dot")
     .data(data)
     .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function (d) {
           return x(d.totala);
     })
     .attr("cy", function (d) {
          return y(d.total);
     })
	 .attr("date",function(d){return d.Year;})
     .attr("stroke", "#0000FF")
     .attr("stroke-width", 1.5)
     .attr("fill", "#0000FF")
	 .on("mouseenter", onenter)
	 .on("mouseleave", onexit);
	 
	
svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));
svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.bottom-5) + ")")
      .style("text-anchor", "middle")
      .text("Per Capita Alochol Consumption(Liters)");
	  
svg.append("g")
     .call(d3.axisLeft(y).tickFormat(function (d) {
          return d3.format(".2f")(d)
     }));
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left-5)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Average Daily Cigarettes smoked Per Smoker");      

	 
	 


	 
// Scale the range of the data



});
});
