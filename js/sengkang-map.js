	var width = 600, height = 400;
	
	var tooltip2 = d3.select("body")
					 .append("div")
					 .attr("class", "tooltip")
					 .style("opacity", 0);

    var svg2 = d3.select("#sengkang-map").append("svg")
            .attr("viewBox", "0 0 " + (width) + " " + (height))
            //.style("max-width", "700px")

   d3.json("data/electoral-boundary-dataset.geo.json", function (error, mapData) {
        var features = mapData.features;
    
    var projection = d3.geoMercator()
    
    var path = d3.geoPath().projection(projection);
	
	var zoom = d3.zoom().scaleExtent([1,8]).on('zoom',zoomed);
    
    var fixed = features.map(function(f) {
      return turf.rewind(f,{reverse:true});
    })
    
    console.log(fixed);
	
	svg2.call(zoom)
    
    projection.fitSize([width,height],{"type": "FeatureCollection","features":fixed})
    
    svg2.append("g")
                .attr("class", "region")
                .selectAll("path")
                .data(fixed)
                .enter()
                .append("path")
                .attr("d", path)
                .style("stroke", "#246fed")
                .style("stroke-width", "0.3")
                .style("fill", ( d ) => d.properties.ED_DESC === 'SENGKANG' ? '#96aff8' : '#fff')
				.on("mouseover", function(d){
					d3.select(this)
					.transition()
					.duration(500)
					.style("stroke", ( d ) => (d.properties.ED_DESC === 'SENGKANG' || d.properties.ED_DESC === 'ALJUNIED'|| d.properties.ED_DESC === 'HOUGANG') ? '#246fed' : '#de435b')
					.style("stroke-width", "1")
					.style("fill", ( d ) => (d.properties.ED_DESC === 'SENGKANG' || d.properties.ED_DESC === 'ALJUNIED'|| d.properties.ED_DESC === 'HOUGANG') ? '#d5dffc' : '#fde5ed');
						tooltip2.transition()
								.duration(500)
								.style("opacity", .9);
						tooltip2.text(d.properties.ED_DESC)
								.style("left", (d3.event.pageX + 5) + "px")
								.style("top", (d3.event.pageY - 60) + "px");
								})
				.on("mouseout", function(d) {
					d3.select(this)
					.transition()
					.duration(500)
					.style("stroke", "#246fed")
					.style("stroke-width", "0.3")
					.style("fill", ( d ) => d.properties.ED_DESC === 'SENGKANG' ? '#96aff8' : '#fff');
						tooltip2.transition()
								.duration(500)
								.style("opacity", 0);
								});
			
				
	function zoomed(){
		svg2.selectAll('path')
			.attr('transform',d3.event.transform)
	};
	
    });