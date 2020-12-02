var pi = Math.PI,
tau = 2 * pi;
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const	tooltip = d3.select("#tooltip")
const datedisplay = d3.select("#datedisplay")
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

var dateArray = getDates(new Date(2014,12,1),new Date(2015,11,31))

var currDay = 0

datedisplay.select("#date").text(dateArray[currDay].toDateString())
    var width = 1400;
        height = 720;

var ease_r_km = 6371.228,ease_c_km = 25.067525,ease_cos_phi = 0.866025403,ease_rows=586,ease_cols=1383;
    // Initialize the projection to fit the world in a 1×1 square centered at the origin.
    const projection = d3.geoMercator()
        .translate([0, 0]);

    var path = d3.geoPath()
        .projection(projection);

  const tile = d3.tile()
      .extent([[0, 0], [width, height]])
	  .scale(projection.scale() * 2 * Math.PI);

    var zoom = d3.zoom()
        .scaleExtent([3, 40])
        .on("zoom", zoomed);

    var svg = d3.select("#scatter").append("svg")
        .attr("width", width)
        .attr("height", height);
		
    var center = projection([-98.5, 60]);

let image = svg.append("g")
      .attr("pointer-events", "none")
    .selectAll("image");
    var raster = svg.append("g");
	var pred = svg.append("g");
    var vector = svg.append("g");
    var legend = svg.append("g");

    // Compute the projected initial center.
function range(start, end,inc) {
    if(start === end) return [start];
    return [start, ...range(start + inc, end,inc)];
}
function ease_convert(lon,lat){
	Rg = ease_r_km/ease_c_km
	r0 = (ease_cols-1)/2
	s0 = (ease_rows-1)/2
	phi = lat*Math.PI/180
	lam = lon*Math.PI/180
	r = r0 + (Rg * ease_cos_phi * lam)
    s = s0 - (Rg / ease_cos_phi * Math.sin(phi))
	return [r,s];
	
}

function ease_inverse(r,s){
	Rg = ease_r_km/ease_c_km;
    r0 = (ease_cols - 1) / 2.0;
    s0 = (ease_rows - 1) / 2.0;
    x =  r - r0;
    y =  -(s - s0);
	beta = ease_cos_phi / Rg * y;
	lat = Math.asin(beta);
	lon = x / ease_cos_phi / Rg;
	lat = 180*lat/Math.PI;
	lon = 180*lon/Math.PI;
	return [lon,lat];
}
function invert(d) {
  const shared = {};

  let p = {
    type: "Polygon",
    coordinates: d3.merge(d.coordinates.map(polygon => {
      return polygon.map(ring => {
        return ring.map(point => {
          return ease_inverse(point[0],point[1]);
        }).reverse();
      });
    }))
  };

  // Record the y-intersections with the antimeridian.
  p.coordinates.forEach(ring => {
    ring.forEach(p => {
      if (p[0] === -180) shared[p[1]] |= 1;
      else if (p[0] === 180) shared[p[1]] |= 2;
    });
  });

  // Offset any unshared antimeridian points to prevent their stitching.
  p.coordinates.forEach(ring => {
    ring.forEach(p => {
      if ((p[0] === -180 || p[0] === 180) && shared[p[1]] !== 3) {
        p[0] = p[0] === -180 ? -179.9995 : 179.9995;
      }
    });
  });

  p = d3.geoStitch(p);

  // If the MultiPolygon is empty, treat it as the Sphere.
  return p.coordinates.length
      ? {type: "Polygon", coordinates: p.coordinates, value: d.value}
      : {type: "Sphere", value: d.value};
}



var colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateViridis);
  
  legend.attr("transform","translate(1220,600)")

legend.append("rect")
.attr("width", "13%")
    .attr("height", "20%")
    .attr("fill", "white")
.attr("stroke","black")
legend.append("path")
.attr("d", d3.symbol().size(200).type(d3.symbolCircle))
.attr("transform", "translate(20,15)")
    .style("fill", colorScale(0))
.style("stroke", "black")
legend
    .append("text")
.attr("transform", "translate(40,25)")
.attr("font-size","200%")
    .text("Frozen");
legend.append("path")
.attr("d", d3.symbol().size(200).type(d3.symbolCircle))
.attr("transform", "translate(20,55)")
    .style("fill", colorScale(1))
.style("stroke", "black")

legend
    .append("text")
.attr("transform", "translate(40,65)")
.attr("font-size","200%")
    .text("Thawed");
legend.append("path")
.attr("d", d3.symbol().size(200).type(d3.symbolSquare))
.attr("transform", "translate(20,95)")
    .style("fill", "green")
.style("stroke", "black")

legend
    .append("text")
.attr("transform", "translate(40,95)")
.attr("font-size","200%")
    .text("Weather");
legend
    .append("text")
.attr("transform", "translate(50,115)")
.attr("font-size","200%")
    .text("station");


d3.buffer("geotiff/fred0.tif").then(function (tiffdata){
d3.csv("weather_stations.csv").then(function (stations){
	stations.forEach(
	function (d) {
			d.longitude = d.lon;
			d.latitude = d.lat;
			d.lon = projection([+d.lon,+d.lat])[0];
			d.lat = projection([+d.lon,+d.lat])[1];
	});
	tiff = GeoTIFF.parse(tiffdata)
    var image = tiff.getImage();
	var n = image.getWidth();
	var m = image.getHeight();	
	var rasters = image.readRasters();
	
	thresholds = range(0,1,1);//thresholds = range(100,260,10);
	var contours = d3.contours()
    .size([n,m])
    .thresholds(thresholds)
	.smooth(false)
	(rasters[0])
	
	path = d3.geoPath(projection).pointRadius(1)
	
	pred.selectAll("path")
        .data(contours.map(invert))
        .enter().append("path")
		.attr("fill", function(d){
			
				temp = d.value//(d.value-100)/(160)
				return colorScale(temp)
		})
		.attr("opacity",.5)
		.attr("d", path)
	
	dots = vector.selectAll("path")
        .data(stations)
        .enter().append("path")
		.attr("fill", "lightgreen")
		.attr("stroke", "black")
		.attr("d",d3.symbol().size(3).type(d3.symbolSquare))
		.attr("transform",function(d){return "translate("+[d.lon,d.lat]+")"})
		.on("mouseenter", onenter)
		.on("mouseleave", onexit);		
	
    // Apply a zoom transform equivalent to projection.{scale,translate,center}.
    svg
        .call(zoom)
        .call(zoom.transform, d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(3)
            .translate(-center[0], -center[1]));
     
})})

function updateData(day) {
	currDay = currDay + day
	if (currDay < 0){
		currDay = 0
	}
	else if(currDay > 363){
		currDay = 363
	}
	datedisplay.select("#date").text(dateArray[currDay].toDateString())
    // Get the data again
    d3.buffer("geotiff/fred"+currDay+".tif").then(function (tiffdata){

tiff = GeoTIFF.parse(tiffdata)
    var image = tiff.getImage();
	var n = image.getWidth();
	var m = image.getHeight();	
	var rasters = image.readRasters();
	
	thresholds = range(0,1,1);//thresholds = range(100,260,10);
	var contours = d3.contours()
    .size([n,m])
    .thresholds(thresholds)
	.smooth(false)
	(rasters[0])
    // Select the section we want to apply our changes to
        pred.selectAll("path").remove()
    // Make the changes
        pred.selectAll("path") 
            .data(contours.map(invert))
        .enter().append("path")
		.attr("fill", function(d){
			
				temp = d.value//(d.value-100)/(160)
				return colorScale(temp)
		})
		.attr("opacity",.5)
		.attr("d", path)

    });
}

function onenter(data){
	
	// var date = this.__data__.Year;
	// tooltip.style("opacity", 1)
	
	tooltip.style("opacity", 1)
	tooltip.style("transform","translate("+(event.pageX)+"px,"+(event.pageY+15)+"px)")
    tooltip.select("#name").text(this.__data__.name)
    tooltip.select("#lon").text(d3.format(".2f")(this.__data__.longitude))
	tooltip.select("#lat").text(d3.format(".2f")(this.__data__.latitude))
	tooltip.select("#elev").text(this.__data__.elevation)
	// tooltip.select("#beer").text(d3.format(".2f")(this.__data__.Beer))
    // tooltip.select("#cigarettes").text(d3.format(".2f")(this.__data__.total))
	// tooltip.select("#male").text(d3.format(".2f")(this.__data__.Male))
	// tooltip.select("#female").text(d3.format(".2f")(this.__data__.Female))
};

function onexit(data){
	
	tooltip.style("opacity", 0)
	tooltip.style("transform","translate("+0+"px,"+0+"px)")
    tooltip.select("#name").text("")
    tooltip.select("#lon").text("")
	tooltip.select("#lat").text("")
	tooltip.select("#elev").text("")
	// d3.selectAll("circle").style('opacity', 1)
		  // .style('stroke','#0000FF')
		  // .style('fill','#0000FF');
    
    // tooltip.select("#year").text(" ")
    // tooltip.select("#alcohol").text("")
	// tooltip.select("#spirits").text("")
	// tooltip.select("#wine").text("")
	// tooltip.select("#beer").text("")
    // tooltip.select("#cigarettes").text("")
	// tooltip.select("#male").text("")
	// tooltip.select("#female").text("")
	//tooltip.style("opacity", 0)
	
	
};




url = (x, y, z) => `https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/${z}/${y}/${x}.png'`
function zoomed(event) {
	var transform = event.transform;
	console.log(transform)
	transform.x = Math.min(transform.k*width/3+100, Math.max(transform.x,  width-width*transform.k/3-100));
	transform.y = Math.min(transform.k*width/3, Math.max(transform.y,  850*transform.k+height-height*transform.k));
	
	
	tile
	  .scale(projection.scale() * 2 * Math.PI*transform.k)
	
	var tiles = tile(transform);
    image = image.data(tiles, function(d){return d}).join("image")
        .attr("xlink:href", d => url(...d))
        .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
        .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
        .attr("width", tiles.scale)
        .attr("height", tiles.scale);
	// update:
	
		
  vector
	.attr("transform", "translate(" + [transform.x, transform.y] + ")scale(" + transform.k + ")")
	.style("stroke-width", 1 / transform.k);
  
  pred.attr("transform", "translate(" + [transform.x, transform.y] + ")scale(" + transform.k + ")")
	
	dots.attr("d",d3.symbol().size(3/(transform.k)).type(d3.symbolSquare))
}

function stringify(scale, translate) {
	var k = scale / 256,
		r = scale % 1 ? Number : Math.round;
	return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
}
