  // set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 30, left: 0},
    width = 500 - margin.left - margin.right,
    height = 255 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.4);
var y = d3.scaleLinear()
          .range([height, 0]);
		  

var tooltip = d3.select("body").append("div");
          
// append the svg object to the chart id, set responsive ratio
var svg = d3.select("#demographic-bar").append("svg")
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr(
    'viewBox',
    '0 0 ' +
      (width + margin.left + margin.right) +
      ' ' +
      (height + margin.top + margin.bottom)
   )
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("data/population.csv", function(data) {
  // format the data
  data.forEach(function(d) {
    d.population = +d.population;
  });


// set curve ratio
  const rx = 12;
  const ry = 12;


  // Scale the range of the data in the domains
  x.domain(data.map(function(d) {
    return d.age; }
    ));

  y.domain([0, d3.max(data, function(d) {
    return d.population; }
  )]);

  // append the path for the bar chart
  svg.selectAll(".bar")
      .data(data)
      .enter().append("path")
      .attr("fill", function(d){ return d.population > 24000 ? "#246fed" : "#96aff8"})
      .attr("d", item => `
        M${x(item.age)},${y(item.population) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(item.population) - ry}
        h${-(x.bandwidth())}Z`)
      //add tooltip
	   .on("mousemove", function(d){
            tooltip
                .attr("class", "tooltip1")
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html("Population:"+ "<br>" +(d.population));
        })
    	.on("mouseout", function(d){tooltip.style("display", "none");});


    // add the x Axis
  svg.append("g")
      .style("font", "14px Poppins")
      .attr('class', 'axis')
      .attr("transform", "translate(0, 230)")
      .call(d3.axisBottom(x))
      .call(g => g.select(".domain").remove());  
});