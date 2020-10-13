	//var width = $('div#results-bar').width()
	var width = 800,
    	height = 100;

    //var svg = d3.select("#results-bar")
    //	.append("svg")
    //	.attr("viewBox", "0 0 800 50")
  	//	.append("g");
	
	
	var data = [{"Party":"WP","votes":52.12},{"Party":"PAP","votes":47.88}]

	var y = d3.scaleBand()
			.range([height,0])
			.padding(0.3);
	
	var x = d3.scaleLinear()
			.range([0,width]);

	
	data.sort(function(a,b) {
		return d3.ascending(a.Party,b.Party)
	})
	
	data.forEach(function(d){
		d.votes = +d.votes;
	});
	
	
	x.domain([0,100])
	y.domain(data.map(function(d){return d.Party;}));
	
  	var svg = d3.select("#results-bar-small")
  	.append("svg")
  	//.attr('height', '60px')
	//.attr('width', '100%')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr("viewBox", '0 0 ' + (width) + ' ' + (height));
	
	svg.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","bar")
		.attr("width",function(d) {return x(d.votes);})
		.attr("y", function (d) { return y(d.Party);})
		.attr("height", y.bandwidth())
		.attr('rx', 12)
		.style("fill",function(d){ return d.votes < 50 ? "#de435b" : "#246fed"});
		
	