

// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1920,
    height = 630,
	tablewidth = 25,
	tableheight = 6;
	
// append the svg object to the body of the page
function range(start, end,inc) {
    if(start === end) return [start];
    return [start, ...range(start + inc, end,inc)];
}


var svg = d3.select("#scatter").append("svg")
      .attr("viewBox", [0, 0, width, height]);
	  

svg.append("rect")
    .attr("width", "150%")
    .attr("height", "100%")
    .attr("fill", "darkgrey");

svg.append("text")
	.attr("transform", "translate(40,30)")
	.attr("font-size","125%")
	.attr("font-weight","bold")
	.attr("x","60%")
	.attr("fill","white")
	.attr("y","94.5%")
    .text("Node color = family relation, Node size = rank, line width & color = # of interactions");

var table = svg.append("g");







table.attr("transform","translate(0,0)")

color = ['red','purple','blue','yellow']
scale =d3.scaleSequential()
  .interpolator(d3.interpolateGreens)
drag = simulation => {
  
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = Math.max(490, Math.min(event.x, width));
    event.subject.fy = Math.max(0, Math.min(event.y, height));
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}


d3.json("links.json").then(function(l){
d3.json("nodes.json").then(function(n){
	console.log(l)
	console.log(n)
	links = []
	for(const link in l){
		links.push(l[link])
	}
	nodes = []
	for(const node in n){
		nodes.push(n[node])
	}
	console.log(links)
const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-4000).theta(.1).distanceMax(height/2))
      .force("center", d3.forceCenter(width *.6, height/2 ));
	  
	  
	  const link = svg.append("g")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke", function(d){return scale(d.value/11)})
      .attr("stroke-width", function(d){ return .5/Math.exp(-Math.log(d.value))});
	
	  
	  node = svg.append("g")
    .selectAll(".node")
    .data(nodes)
    .join("g")
      .attr('class', 'node')
      .call(drag(simulation));
	   
	   node.append('circle')
	   .attr("r", function(d){return Math.max(30/d.rank,4)})
       .attr("fill", function(d){return color[d.group]})
	  
	  
	    node.append("text")
      .text(function(d) {
        return d.id;
      })
		.attr("fill","white")
      .style('font-size', function(d){return 18+20/d.rank+'px'})
      .attr('x', 6)
      .attr('y', 3);
  simulation.on("tick", () => {
	 
    link
        .attr("x1", function(d){d.source.x = Math.max(490, Math.min(d.source.x, width-20));return d.source.x})
        .attr("y1", function(d){d.source.y = Math.max(20, Math.min(d.source.y, height-20));return d.source.y})
        .attr("x2", function(d){d.target.x = Math.max(490, Math.min(d.target.x, width-20));return d.target.x})
        .attr("y2", function(d){d.target.y = Math.max(20, Math.min(d.target.y, height-20));return d.target.y});

     node
        .attr("transform", d => `translate(${Math.max(490, Math.min(d.x, width-20))}, ${Math.max(20, Math.min(d.y, height-20))})`);
  });

	  
})})




d3.csv("monkeyrating.csv").then(function(monkey){
	
	h = 100/21
	
	boxheight = 100/21+"%"
	table.append("rect")
		.attr("width", "8%")
		.attr("height", boxheight)
		.attr("fill", "white")
		.attr("stroke","black")
	
	table.append("text")
		.attr("x","4%")
		.attr("y","3.8%")
		.style("text-anchor","middle")
		.attr("font-size","200%")
		.text("ID");
		
		table.append("rect")
		.attr("width", "8%")
		.attr("height", boxheight)
		.attr("x","8%")
		.attr("fill", "white")
		.attr("stroke","black")
	
	table.append("text")
		.attr("x","12%")
		.attr("y","3.8%")
		.style("text-anchor","middle")
		.attr("font-size","200%")
		.text("Rank");
		
				table.append("rect")
		.attr("width", "8%")
		.attr("height", boxheight)
		.attr("x","16%")
		.attr("fill", "white")
		.attr("stroke","black")
	
	table.append("text")
		.attr("x","20%")
		.attr("y","4.25%")
		.style("text-anchor","middle")
		.attr("font-size","120%")
		.text("Centrality");
	table.append("text")
		.attr("x","20%")
		.attr("y","2.25%")
		.style("text-anchor","middle")
		.attr("font-size","120%")
		.text("Betweeness");
	
	monkey.forEach(
	function (d) {
			
	
			
	
	table.append("rect")
		.attr("width", "8%")
		.attr("height", boxheight)
		.attr("y",h+"%")
		.attr("fill", "white")
		.attr("stroke","black")
	table.append("text")
		.attr("x","4%")
		.attr("y",h+4+"%")
		.style("text-anchor","middle")
		.attr("font-size","200%")
		.text(d.Id);
		
	table.append("rect")
		.attr("width", "8%")
		.attr("height", boxheight)
		.attr("x","8%")
		.attr("y",h+"%")
		.attr("fill", "white")
		.attr("stroke","black")
	table.append("text")
		.attr("x","12%")
		.attr("y",h+4+"%")
		.style("text-anchor","middle")
		.attr("font-size","200%")
		.text(d.rank);
		
	table.append("rect")
		.attr("width", "8%")
		.attr("height", boxheight)
		.attr("x","16%")
		.attr("y",h+"%")
		.attr("fill", "white")
		.attr("stroke","black")
	table.append("text")
		.attr("x","20%")
		.attr("y",h+4+"%")
		.style("text-anchor","middle")
		.attr("font-size","200%")
		.text(d.betweenesscentrality);
		
		
		h=h+100/21;
		
		
	});
	
	
	
	
	
  // compute the density data
	

		
		
		
	
		
		


	

	

})