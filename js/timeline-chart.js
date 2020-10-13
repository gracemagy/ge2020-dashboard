
var width = 660, height = 110;

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
y.domain(data.map(function(d) { return d.event; }));


    // add the x Axis
   /* svg5.append("g")
    .style("font", "8px Poppins")
    .attr('class', 'axis-dark')
    .attr("transform", "translate(50,80)")
    .call(d3.axisBottom(x))
    .call(g => g.select(".domain"));*/

  // Add line
svg5.append('line')
    .style("stroke", "grey")
	.style("stroke-dasharray", ("3, 3")) 
    .style("stroke-width", 1)
    .attr("x1", 0)
    .attr("y1", 0)
	.attr("transform", "translate(3,28)")
    .attr("x2", 700)
    .attr("y2", 0); 

  // Add dot
var dot = svg5.append("g")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d, i) { return i * 85 + 20; })
  .attr("cy", 0 )
  .attr("r", 9)
  .style("fill", "#246fed")
  .attr("transform", "translate(3,28)")
  .attr("stroke","#96aff8")
  .attr('stroke-width',5);
  



//Add the SVG Text Element to the svgContainer

var title = svg5.append("g")
				.selectAll("text")
                .data(data)
                .enter()
				.append("text");
				
				
//var title = d3.select("body").append("div");
				
var titleLabels = title
               .attr("x", function(d, i) { return i * 85 + 20;})
               .attr("y", function(d) { return x(d.event); })
				.text( function (d) { return d.date; })
			   .attr("transform", "translate(-15,6)")
               .attr("font-family", "sans-serif")
               .attr("font-size", "8.5px")
			   .attr("font-weight", "bold")
			   
               .attr("fill", "#222");
			   
var title2 = svg5.append("g")
				.selectAll("body")
                .data(data)
                .enter()
				.append("text");
				
var title3 = svg5.append("g")
				.selectAll("body")
                .data(data)
                .enter()
				.append("text");				
//var title = d3.select("body").append("div");
				
var title2Labels = title2
				//.append("tspan")
               .attr("x", function(d, i) { return i * 84 + 30;})
               .attr("y", function(d) { return x(d.event); })
				.text(function (d) { return d.event; })
				.call(wrap, 130)
			   //.attr("transform", "translate(-30,40)")
         .attr("transform", "translate(-30,55)")
               .attr("font-family", "sans-serif")
               .attr("font-size", "8.5px")
               .attr("fill", "#222");
			   


			   
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            //lineNumber = 0.1,
            //lineHeight = 0.8, 
            lineNumber = 1,
            lineHeight = 1, 
            x = text.attr("x"),
            y = text.attr("y"),
			dy = 0, 
            tspan = text.text(null)
                        //.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy );
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", "1.5em")
                            //.attr("dy", ++lineNumber + "em")
                            //.attr("dy", ++lineNumber*lineHeight + dy)
							.text(word);
            }
        }
    });
}

  });