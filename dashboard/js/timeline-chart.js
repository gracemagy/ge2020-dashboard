
var width = 600, height = 100;

// append the svg object to the body of the page
var svg5 = d3.select("#timeline-chart").append("svg")
.attr("viewBox", "0 0 " + (width) + " " + (height))
    /*.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)*/
    .append("g");
	// Define the div for the tooltip

	
	d3.csv("data/GE_event.csv", function(data) {

		var tooltip3 = d3.select("body")
		.append("div");
		//.attr('class', 'tooltip1');


 // format the data
// data.forEach(function(d) {
// 	d.event1 = +d.event1;
// });

 x.domain(data.map(function(d) { return d.date; }));
// y.domain(data.map(function(d) { return d.event1; }));


    // add the x Axis
    svg5.append("g")
    .style("font", "8px Poppins")
    .attr('class', 'axis-dark')
    .attr("transform", "translate(0,80)")
    .call(d3.axisBottom(x))
    .call(g => g.select(".domain"));


  // Add dots
  var dot = svg5.append("g")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function (d) { return x(d.date); } )
  .attr("cy", 0 )
  .attr("r", 10)
  .style("fill", "#246fed")
  .attr("transform", "translate(15,70)")
  .attr("stroke","rgba(36, 111, 237, 0.4)")
  .attr('stroke-width',0)

    //new method
  	.on("mousemove", function(d){
  		d3.select(this)
  	.transition()
  	.duration(500)
  	.attr("stroke-width",10)
  	.attr("stroke", "rgba(36, 111, 237, 0.4)")
  		tooltip3
			.style("left", d3.event.pageX - 100 + "px")
			.style("top", d3.event.pageY - 100 + "px")
			.style("display", "inline-block")
			.style("width", "200px")
			.attr('class', 'tooltip3')
			.html(d.event);
		})
  	.on("mouseout", function(d){
  		d3.select(this)
  	.transition()
  	.duration(500)
  	.attr('stroke-width',0)
  		tooltip3
  		.style("display", "none");
  });


  });